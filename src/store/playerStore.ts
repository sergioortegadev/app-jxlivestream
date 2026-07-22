import '@js-temporal/polyfill';
import { Temporal } from '@js-temporal/polyfill';
import Config from 'react-native-config';
import { create } from 'zustand';
import { HealthResponse, PlayerState } from '../types/player';
import { AdapterFactory, AdapterType } from '../adapters/AdapterFactory';
import { IStreamAdapter } from '../adapters/types/IStreamAdapter';

const ADAPTER_TYPE: AdapterType = Config.ADAPTER_TYPE;
let adapter: IStreamAdapter = AdapterFactory.createAdapter(ADAPTER_TYPE)

const RETRY_DELAY_MS = Config.RETRY_DELAY_MS; 
const MAX_RETRIES = Config.MAX_RETRIES;
const POLLING_INTERVAL_MS = Config.POLLING_INTERVAL_MS;
const OFFLINE_CHECK_INTERVAL_MS = 3000;
const PLAYBACK_HEALTH_CHECK_MS = 3000;
const STREAM_URL = `${Config.HOST}/audio`;
let pollingInterval: number | null = null;
let timerInterval: number | null = null;

let offlineCheckInterval: number | null = null;
let errorCheckInterval: number | null = null;
let playbackHealthCheckInterval: number | null = null; 

export const usePlayerStore = create<PlayerState>((set, get) => ({

     // ===== Init State =====
     currentTime: 0,
     duration: 0,
     elapsedTime: 0,
     error: null,
     isBuffering: false,
     isLive: false,
     isLoading: true,
     isPlaying: false,
     isPaused: false,
     isReconnecting: false,
     maxRetries: MAX_RETRIES,
     retryCount: 0,
     startTime: null,
     streamUrl: STREAM_URL,


    // ========== ACTIONS ==========
    initializeStream: async () => {
        try {
            set({ isReconnecting: true, error: null });
            const data = await adapter.checkHealth();

            if(!data) throw new Error(`No se pudo obtener estado del servidor`);

            if (data.publisherConnected) {
                    // Backend transmitiendo
                set({
                    isLive: true,
                    isLoading: false,
                    isReconnecting: false,
                    error: null,
                    retryCount: 0, // reset retries cuando conecta
                });
            }   else {
                    // Backend NO transmitiendo
                set({
                    isLive: false,
                    isLoading: false,
                    isReconnecting: false,
                    error: '  No estamos transmitiendo en este momento',
                });
            };
        } catch(error) {
            console.error(`   [playerStore] Error en initializeStream: ${error}`);
            set({
                error: `Error al conectar con el backend \n${error}`,
                isLive: false,
                isLoading: false,
                isReconnecting: false,
            });

            get().startErrorHealthCheck();
        }
    },

    attemptReconnect: async () => {
        const state = get();
        const newRetryCount = state.retryCount + 1;

        if (newRetryCount > state.maxRetries) {
            set({
                error: '❌ No se pudo reconectar. Sugerimos cerrar la app y volver a abrirla. Disculpas.',
                isReconnecting: false,
                retryCount: newRetryCount,
            });

            get().startErrorHealthCheck();
            return;
        }

        set({
            isReconnecting: true,
            retryCount: newRetryCount,
        });

        console.log(`   [playerStore] Intento de reconexión ${newRetryCount}/${state.maxRetries}`);

        await new Promise<void>((resolve) => setTimeout(resolve, RETRY_DELAY_MS));

        try {
            const data = await adapter.checkHealth();

            if(!data) throw new Error(`Sin respuesta del servidor`);

            if (data.publisherConnected) {
                // ✅ Se pudo reconectar
                set({
                    isLive: true,
                    isReconnecting: false,
                    error: null,
                    retryCount: 0, // reset si reconecta
                });
                console.log('   [playerStore] Reconectado exitosamente');
                get().stopErrorHealthCheck();
            } else {
                // Backend aún sin transmisión
                set({
                    isLive: false,
                    error: null,
                    isReconnecting: false,
                }); 
                get().startOfflineHealthCheck();
            } 

        }   catch (error) {
            // Sigue sin poder reconectar, vuelve a intentar 🔄. Recursividad.
            console.error(`   [playerStore] Reintento falló: ${error}`);
            get().attemptReconnect();
        }
    },

    // Luego de los 10 reintentos de conectar fallidos. Espera y vuelve a verificar si hay transmisión en /health, periodicamente hasta que encuetra el back transmitiendo.
    startPeriodicHeathCheck: () => {
        // Si ya existe un polling, no crea otro
        if (pollingInterval) return;

        console.log(`   [playerStore] Iniciando health check periódico cada ${POLLING_INTERVAL_MS/1000}s`);
        
        pollingInterval = setInterval(async () => {
            try {
                const data = await adapter.checkHealth();

                if (data?.publisherConnected) {
                    console.log('   [playerStore] Transmisión recuperada');

                    set({
                        isLive: true,
                        isReconnecting: false,
                        error: null,
                        retryCount: 0,
                    });

                    get().stopPeriodicHealthCheck();
                }
            } catch (error) {
                console.log('   [playerStore] Health check periódico falló, espera y reintento...');
            }
        }, POLLING_INTERVAL_MS);        
    },

    stopPeriodicHealthCheck: () => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
            console.log('   [playerStore] Health check periódico detenido');            
        }
    },

    /*
     * Permite cambiar adapter en runtime
     */
    setAdapter: (newAdapter: IStreamAdapter) => {
        adapter = newAdapter;
        console.log(`   [playerStore] Adapter cambiado a: ${adapter.getName()}`);  
    },

    startPlaybackHealthCheck: () => {
    if (playbackHealthCheckInterval) return;

    console.log('[playerStore] Iniciando health check durante reproducción');
    
    playbackHealthCheckInterval = setInterval(async () => {
      try {
        const data = await adapter.checkHealth();

        if (!data?.publisherConnected) {
          // ❌ Transmisión se cayó MIENTRAS estaba reproduciendo
          console.log('[playerStore] ❌ Transmisión se cayó durante reproducción');
          
          // ✅ Detener automáticamente (como si user tocó STOP)
          set({
            isLive: false,
            isPlaying: false,
            isPaused: false,
            elapsedTime: 0,
            startTime: null,
            error: '❌ Transmisión perdida, espere o recargue en un minuto.',
          });

          // Detener timer
          if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
          }

          // Detener este health check
          get().stopPlaybackHealthCheck();
          // ✅ Iniciar revisión silenciosa offline
          get().startOfflineHealthCheck();
        }
      } catch (error) {
        // Error de conexión mientras reproducía
        console.log('[playerStore] Error en playback health check');
        get().stopPlaybackHealthCheck();
        get().startErrorHealthCheck();
      }
    }, PLAYBACK_HEALTH_CHECK_MS);        
    },

    stopPlaybackHealthCheck: () => {
    if (playbackHealthCheckInterval) {
      clearInterval(playbackHealthCheckInterval);
      playbackHealthCheckInterval = null;
      console.log('[playerStore] Health check reproducción detenido');            
    }
    },

    startOfflineHealthCheck: () => {
    if (offlineCheckInterval) return;

    console.log('[playerStore] Iniciando check offline silencioso (cada 3s)');
    
    offlineCheckInterval = setInterval(async () => {
        try {
        const data = await adapter.checkHealth();

        if (data?.publisherConnected) {
            console.log('[playerStore] ✅ Transmisión iniciada');

            set({
            isLive: true,
            error: null,
            retryCount: 0,
            });

            get().stopOfflineHealthCheck();
        }
        } catch (error) {
        // Si hay error aquí, cambiar a revisión de error
        get().stopOfflineHealthCheck();
        get().startErrorHealthCheck();
        }
    }, OFFLINE_CHECK_INTERVAL_MS);        
    },

    stopOfflineHealthCheck: () => {
    if (offlineCheckInterval) {
        clearInterval(offlineCheckInterval);
        offlineCheckInterval = null;
        console.log('[playerStore] Health check offline detenido');            
    }
    },

    startErrorHealthCheck: () => {
    if (errorCheckInterval) return;

    console.log('[playerStore] Iniciando check error silencioso (cada 3s)');
    
    errorCheckInterval = setInterval(async () => {
        try {
        const data = await adapter.checkHealth();

        if (data?.publisherConnected) {
            console.log('[playerStore] ✅ Reconectado después de error');

            set({
            isLive: true,
            error: null,
            retryCount: 0,
            });

            get().stopErrorHealthCheck();
        } else {
            console.log('[playerStore] Backend responde, pero sin transmisión');
            set({ error: null });
            get().stopErrorHealthCheck();
            get().startOfflineHealthCheck();
        }
        } catch (error) {
        // Sigue intentando silenciosamente
        console.log('[playerStore] Health check error falló, reintentando...');
        }
    }, OFFLINE_CHECK_INTERVAL_MS);        
    },

    stopErrorHealthCheck: () => {
    if (errorCheckInterval) {
        clearInterval(errorCheckInterval);
        errorCheckInterval = null;
        console.log('[playerStore] Health check error detenido');            
    }
    },

    // solo actualizaciones de estado, no control de reproducción
    play: () => {
        set({ isPlaying: true, isPaused: false });
        get().startTimer();
        get().startPlaybackHealthCheck();
    },

    pause: () => {
        set({ isPlaying: false, isPaused: true });
        get().stopTimer();
        get().stopPlaybackHealthCheck();
    },

    stop: () => {
        set({ isPlaying: false, isPaused: false });
        get().stopPeriodicHealthCheck();
        get().stopPlaybackHealthCheck();
        get().stopOfflineHealthCheck();
        get().stopErrorHealthCheck();
        get().stopTimer();
    },

    // Llamado por onProgress. Actualiza posición en tiempo real (para progress bar)    
    setCurrentTime: (time: number) => {
        set({ currentTime: time });
    },

    // llamado por onLoad
    setDuration: (duration: number) => {
        set({ duration });
    },

    setIsLive: (isLive: boolean) => {
        set({ isLive });
    },

    setError: (error: string | null ) => {
        set({ error });
    },

    setIsBuffering: (buffering: boolean) => {
        set({ isBuffering: buffering });
    },

    setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
    },

    startTimer: () => {
        if(timerInterval) return;

        const start = Temporal.Now.instant();
        set({ startTime: start, elapsedTime: 0 });

        timerInterval = setInterval(() => {
            const state = get();
            const now = Temporal.Now.instant();

            const elapsed = Math.floor( 
                now.since(state.startTime as Temporal.Instant).total('second')
            );

            set({ elapsedTime: elapsed }); 
        }, 1000);
    },

    stopTimer: () => {
        if(timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        set({ elapsedTime: 0, startTime: null });
    },


    // Reset
    reset: () => {
        get().stopPeriodicHealthCheck();
        get().stopPlaybackHealthCheck();
        get().stopOfflineHealthCheck();
        get().stopErrorHealthCheck();
        get().stopTimer();
        set({
            isLive: false,
            isPlaying: false,
            isPaused: false,
            currentTime: 0,
            duration: 0,
            isBuffering: false,
            isReconnecting: false,
            error: null,
            retryCount: 0,
            elapsedTime: 0,
            startTime: null,
        });
    },
    }));