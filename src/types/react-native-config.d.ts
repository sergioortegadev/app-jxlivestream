import { type AdapterType } from '../adapters/AdapterFactory'

declare module 'react-native-config' {
    export interface NativeConfig {
        HOST: string;
        RETRY_DELAY_MS: number;
        MAX_RETRIES: number;
        POLLING_INTERVAL_MS: number;
        ADAPTER_TYPE: AdapterType;
    };

    export const Config: NativeConfig;
    export default Config
};