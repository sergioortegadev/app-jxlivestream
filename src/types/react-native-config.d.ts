declare module 'react-native-config' {
    export interface NativeConfig {
        HOST: string;
        RETRY_DELAY_MS: number;
        MAX_RETRIES: number;
        POLLING_INTERVAL_MS: number;
    };

    export const Config: NativeConfig;
    export default Config
};