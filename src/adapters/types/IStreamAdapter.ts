/**
 * Interfaz que define el contrato para cualquier estrategia de conexión
 */

export interface HealthCheckResponse {
    publisherConnected: boolean;
    listeners: number;
    bufferedChunks: number;
    bytesReceived: number;
    bitrateKbps: number;
}

export interface IStreamAdapter {
    /**
     * Obtiene el estado actual de la transmisión
     * @returns HealthCheckResponse o null si error
     */
    checkHealth(): Promise<HealthCheckResponse | null>;

    /**
     * Obtiene la URL del stream para reproducir
     * @returns URL string o null si error
     */
    getStreamUrl(): Promise<string | null>;

    /**
     * Valida que el adapter está correctamente configurado
     * @returns true si está listo, false sino
     */
    isConfigured(): boolean;

    /**
     * Nombre del adapter (para logs)
     */
    getName(): string;

}