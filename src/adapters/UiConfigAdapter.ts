import Config from "react-native-config";
import { UiConfigActions, UiConfigResponse } from "./types/UiConfigAdapterTypes";

export class UiConfigAdapter implements UiConfigActions {
    private uiConfigUrl: string;

    constructor() {
        this.uiConfigUrl = `${Config.HOST}/api/ui-config`;
    }

    async checkUiConfig(): Promise<UiConfigResponse | null> {
        try {
            const response = await fetch(this.uiConfigUrl);
            if(!response.ok) throw new Error(`[UiConfigAdapter] Ui Config check error: ${response.status}`);
            const data = await response.json();

            return {
                stationTitle: data.stationTitle,
                stationSubTitle: data.stationSubTitle,
                stationDescription: data.stationDescription,
            };

        } catch (error) {
            console.error(`[UiConfigAdapter] Ui Config check error: ${error}`);
            return null;
        }
    }
}