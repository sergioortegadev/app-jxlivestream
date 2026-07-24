import { AdapterFactory } from '../AdapterFactory';
export interface UiConfigResponse {
    stationTitle: string;
    stationSubTitle: string;
    stationDescription: string;
}

export interface UiConfigActions {
    checkUiConfig(): Promise<UiConfigResponse | null>;
}