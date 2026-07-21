import { IStreamAdapter } from "./types/IStreamAdapter";
import { HTTPStreamAdapter } from "./HTTPStreamAdapter";
// import { RTMPAdapter } from './RTMPAdapter';        // Futura implementación
// import { WebSocketAdapter } from './WebSocketAdapter'; // Futura implementación

export type AdapterType = 'http' | 'rtmp' | 'websocket';

export class AdapterFactory {
    /*
     * Crea el adapter según tipo solicitado
     */
    static createAdapter (type: AdapterType): IStreamAdapter {
        switch (type) {
            case 'http':
                return new HTTPStreamAdapter();
                
            // case 'rtmp':
            //   return new RTMPAdapter();
      
            // case 'websocket':
            //   return new WebSocketAdapter();
        
            default:
                console.warn(`[AdapterFactory] Tipo de adapter desconocido o no implementado: ${type}, usando 'http' por defecto`);
                return new HTTPStreamAdapter();
        }
    }
}