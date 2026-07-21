/**
 * RTMPAdapter - Implementación futura
 * Por ahora solo estructura
 */
import Config from 'react-native-config';
import { IStreamAdapter, HealthCheckResponse } from './types/IStreamAdapter';

export class RTMPAdapter implements IStreamAdapter {
  private rtmpUrl: string;

  constructor(rtmpUrl: string = `rtmp://${Config.HOST}:1935`) {
    this.rtmpUrl = rtmpUrl;
  }

  async checkHealth(): Promise<HealthCheckResponse | null> {
    // TODO: Implementar lógica RTMP
    console.warn('[RTMPAdapter] No implementado aún, solo estructura');
    return null;
  }

  async getStreamUrl(): Promise<string | null> {
    // TODO: Implementar obtención de URL RTMP
    return null;
  }

  isConfigured(): boolean {
    return !!this.rtmpUrl;
  }

  getName(): string {
    return 'RTMPAdapter';
  }
}