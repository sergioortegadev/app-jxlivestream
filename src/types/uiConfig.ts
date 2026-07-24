export interface uiConfigType {
    title: string;
    subtitle: string;
    description: string;
    initializeUiConfig: () => Promise<void>;
}