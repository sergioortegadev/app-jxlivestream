import '@js-temporal/polyfill';
import { Temporal } from '@js-temporal/polyfill';
import Config from 'react-native-config';
import { create } from 'zustand';
import { HealthResponse, PlayerState } from '../types/player';
import { AdapterFactory, AdapterType } from '../adapters/AdapterFactory';
import { IStreamAdapter } from '../adapters/types/IStreamAdapter';

const ADAPTER_TYPE: AdapterType = 'http';
let adapter: IStreamAdapter = AdapterFactory.createAdapter(ADAPTER_TYPE)

const HEALTH_CHECK_URL = `${Config.HOST}/health`;
const STREAM_URL = `${Config.HOST}/audio`;
const RETRY_DELAY_MS = Config.RETRY_DELAY_MS; 
const MAX_RETRIES = Config.MAX_RETRIES;
const POLLING_INTERVAL_MS = Config.POLLING_INTERVAL_MS;
let pollingInterval: number | null = null;
let timerInterval: number | null = null;

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
                    // ✅ Backend transmitiendo
                set({
                    isLive: true,
                    isLoading: false,
                    isReconnecting: false,
                    error: null,
                    retryCount: 0, // reset retries cuando conecta
                });
            }   else {
                    // ❌ Backend NO transmitiendo
                set({
                    isLive: false,
                    isLoading: false,
                    isReconnecting: false,
                    error: '  ❌ No estamos transmitiendo en este momento',
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

            get().attemptReconnect();
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

            get().startPeriodicHeathCheck();
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
            } else {
                // ❌ Backend aún sin transmisión
                set({
                    isLive: false,
                    error: '   ❌ No estamos transmitiendo en este momento',
                    isReconnecting: false,
                }); 
            } 

        }   catch (error) {
            // ❌ Sigue sin poder reconectar, vuelve a intentar 🔄. Recursividad.
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

    /*
     * Permite cambiar adapter en runtime
     */
    setAdapter: (newAdapter: IStreamAdapter) => {
        adapter = newAdapter;
        console.log(`   [playerStore] Adapter cambiado a: ${adapter.getName()}`);
        
    },

    stopPeriodicHealthCheck: () => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
            console.log('   [playerStore] Health check periódico detenido');            
        }
    },

    // solo actualizaciones de estado, no control de reproducción
    play: () => {
        set({ isPlaying: true });
        get().startTimer();
    },

    pause: () => {
        set({ isPlaying: false });
        get().stopTimer();
    },

    stop: () => {
        set({ isPlaying: false });
        get().stopPeriodicHealthCheck();
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
        set({
            isLive: false,
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            isBuffering: false,
            isReconnecting: false,
            error: null,
            retryCount: 0,
        });
    },
    }));