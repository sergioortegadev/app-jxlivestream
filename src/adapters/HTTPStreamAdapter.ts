/**
 * Adaptador para conexión HTTP 
 * 
 * Implementa IStreamAdapter para conexión estándar HTTP a backend
 */
import Config from "react-native-config";
import { IStreamAdapter, HealthCheckResponse } from "./types/IStreamAdapter";

export class HTTPStreamAdapter implements IStreamAdapter {
    private healthCheckUrl: string;
    private streamUrl: string;

    constructor() {
        this.healthCheckUrl = `${Config.HOST}/health`;
        this.streamUrl = `${Config.HOST}/audio`;
    }

    async checkHealth(): Promise<HealthCheckResponse | null> {
        try {
            const response = await fetch(this.healthCheckUrl);
            if(!response.ok) throw new Error(`[HTTPStreamAdapter] Health check error: ${response.status}`);
            const data = await response.json();

            if(typeof data.publisherConnected !== 'boolean') throw new Error(`[HTTPStreamAdapter] Respuesta inválida del backend`);
            
            return {
                publisherConnected: data.publisherConnected,
                listeners: data.listeners || 0,
                bufferedChunks: data.bufferedChunks || 0,
                bytesReceived: data.bytesReceived || 0,
                bitrateKbps: data.bitrateKbps || 0,
            };

        } catch (error) {
            console.error(`[HTTPStreamAdapter] checkHealth error: ${error}`);
            return null;
        }
    }

    async getStreamUrl(): Promise<string | null> {
        try {
            return this.streamUrl;
        } catch (error) {
            console.error(`[HTTPStreamAdapter] getStreamUrl error: ${error}`);
            return null;
        }
    }

    isConfigured(): boolean {
        return !!this.healthCheckUrl && !!this.streamUrl;
    }

    getName(): string {
        return 'HTTPStreamAdapter';
    }
}