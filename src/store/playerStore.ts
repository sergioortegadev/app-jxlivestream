import '@js-temporal/polyfill';
import { Temporal } from '@js-temporal/polyfill';
import Config from 'react-native-config';
import { create } from 'zustand';
import { PlayerState } from '../types/player';
import { AdapterFactory, AdapterType } from '../adapters/AdapterFactory';
import { IStreamAdapter } from '../adapters/types/IStreamAdapter';
import { UiConfigActions } from '../adapters/types/UiConfigAdapterTypes';
import { uiConfigType } from '../types/uiConfig';

const ADAPTER_TYPE: AdapterType = Config.ADAPTER_TYPE;
let adapter: IStreamAdapter = AdapterFactory.createAdapter(ADAPTER_TYPE);
let uiConfigAdapter: UiConfigActions = AdapterFactory.createUiConfigAdapter();

const RETRY_DELAY_MS = Config.RETRY_DELAY_MS; 
const MAX_RETRIES = Config.MAX_RETRIES;
const POLLING_INTERVAL_MS = Config.POLLING_INTERVAL_MS;
const OFFLINE_CHECK_INTERVAL_MS = 3000;
const PLAYBACK_HEALTH_CHECK_MS = 7000;
const STREAM_URL = `${Config.HOST}/audio`;
let pollingInterval: number | null = null;
let timerInterval: number | null = null;

let offlineCheckInterval: number | null = null;
let errorCheckInterval: number | null = null;
let playbackHealthCheckInterval: number | null = null; 

export const useUiConfig = create<uiConfigType>((set, get) => ({
    // === Itit UI CONFIG State ===

    title: 'JxLiveStream',
    subtitle: 'Escucha la transmisión en vivo',
    description: '',

    // == Actions ==
    initializeUiConfig: async () => {
        try {
            const data = await uiConfigAdapter.checkUiConfig();
            if(!data) throw new Error(`No se pudo obtener titulo, subtitulo ni descripcion del endpoint ui-config del backend`);

            set({
                title: data.stationTitle, 
                subtitle: data.stationSubTitle, 
                description: data.stationDescription,
            });
        } catch (error) {
            
        }
    }

}));

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
     playerKey: 0,
     retryCount: 0,
     startTime: null,
     statusMessage: null,
     streamUrl: STREAM_URL,
     wasPlayingBeforeLoss: false,


    // ========== ACTIONS ==========
    initializeStream: async () => {
        try {
            set({ isReconnecting: true, error: null, isLoading: true });
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
                    error: null, // Sin error muestra: No estamos transmitiendo
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

    startOfflineHealthCheck: () => {
        if (offlineCheckInterval) return;

        console.log('[playerStore] Iniciando check offline silencioso (cada 3s)');
        
        offlineCheckInterval = setInterval(async () => {
            try {
                const data = await adapter.checkHealth();

                if (data?.publisherConnected) {
                    console.log('[playerStore] ✅ Transmisión iniciada');

                    const state = get();

                    // Detener polling antes de cambiar estado
                    get().stopOfflineHealthCheck();

                    set({
                        isLive: true,
                        error: null,
                        retryCount: 0,
                        statusMessage: 'Transmisión detectada, comenzando a recibir audio, espere un instante por favor',
                    });

                    // Forzar re-mount del componente Video para vaciar chunks viejos del buffer
                    get().bumpPlayerKey();

                    if (state.wasPlayingBeforeLoss) {
                        console.log('[playerStore] Reanudando reproducción tras vaciar buffer (espera 2s)');
                        // Esperar que lleguen chunks frescos antes de dar play
                        setTimeout(() => {
                            get().play();
                            set({ wasPlayingBeforeLoss: false, statusMessage: null });
                        }, 5000);
                    } else {
                        setTimeout(() => set({ statusMessage: null }), 7000);
                    }
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

    setWasPlayingBeforeLoss: (was: boolean) => {
        set({wasPlayingBeforeLoss: was});
    },

    bumpPlayerKey: () => set(state => ({ playerKey: state.playerKey + 1 })),

    setStatusMessage: (msg: string | null) => set({ statusMessage: msg }),

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
        set({ isPlaying: false, isPaused: false, wasPlayingBeforeLoss: false });
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

    startPlaybackHealthCheck: () => {
        if (playbackHealthCheckInterval) return;

        console.log('[playerStore] Iniciando health check durante reproducción');
        
        playbackHealthCheckInterval = setInterval(async () => {
        const state = get();
        
        // Solo revisar si está reproduciendo
        if (!state.isPlaying) {
            get().stopPlaybackHealthCheck();
            return;
        }

        try {
            const data = await adapter.checkHealth();

            if (!data?.publisherConnected) {
                // ❌ Transmisión se cayó MIENTRAS reproducía
                console.log('[playerStore] ❌ Transmisión perdida durante reproducción');
                
                // ✅ Pausar automáticamente
                set({
                    isPlaying: false,
                    isPaused: true,
                    isLive: false,
                    wasPlayingBeforeLoss: true,
                    error: 'Transmisión perdida, intentando reconectar...',
                });

                get().stopTimer();

                // Detener este health check
                get().stopPlaybackHealthCheck();

                // Iniciar revisión silenciosa offline
                get().startOfflineHealthCheck();
            }
        } catch (error) {
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
            playerKey: 0,
            retryCount: 0,
            elapsedTime: 0,
            startTime: null,
            statusMessage: null,
            wasPlayingBeforeLoss: false,
        });
    },
    }));