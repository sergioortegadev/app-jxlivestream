import { usePlayerStore as useStore } from "../store/playerStore";
import { useUiConfig as useUiConfigStore } from "../store/playerStore";

export const usePlayerStore = useStore;
export const useUiConfig = useUiConfigStore;