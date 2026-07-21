/*
 * Estado del reproductor de audio
 * Zustand store type-safe
 */
import '@js-temporal/polyfill';
import { Temporal } from '@js-temporal/polyfill';
import { IStreamAdapter } from '../adapters/types/IStreamAdapter';

export type StreamStatus = 'live' | 'offline' | 'loading' | 'error';

export interface PlayerState {

    // ===== State =====
    currentTime: number; // tiempo actual transmisión, en segundos
    duration: number; // duracion total, si la hay
    elapsedTime: number;
    error: string | null; 
    isBuffering: boolean;
    isLive: boolean;
    isLoading: boolean;
    isPlaying: boolean;
    isReconnecting: boolean;
    maxRetries: number;
    retryCount: number; // intentos fallidos de reconectar
    startTime: Temporal.Instant | null;
    streamUrl: string;

    // ==== Actions ====
    // Inicializa stream al abrir la app, y check status en /health
    initializeStream: () => Promise<void>;
    attemptReconnect: () => Promise<void>;
    play: () => void;
    pause: () => void;
    stop: () => void;

    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    setIsLive: (isLive: boolean) => void;
    setError: (error: string | null) => void;
    setIsBuffering: (buffering: boolean) => void;
    setIsLoading: (loading: boolean) => void;
    
    startTimer: () => void;
    stopTimer: () => void;
    reset: () => void; 
    
    startPeriodicHeathCheck: () => void;
    stopPeriodicHealthCheck: () => void;

    setAdapter: (newAdapter: IStreamAdapter) => void;
};

// Respuesta del endpoint /health

export interface HealthResponse {
    status: 'ok' | 'error';
    uptime: number;
    listeners: number;
    bufferedChunks: number;
    publisherConnected: boolean;
    bytesReceived: number;
    bitrateKbps: number;
    stream: {
        publish: string;
        audio: string;
    };
};

// configuracion del player
export interface PlayerConfig {
    maxRetries: number;
    retryDelayMs: number;
    healthCheckUrl: string;
    streamAuditUrl: string;
}