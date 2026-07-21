import React, { useRef, useEffect } from "react";
import Video from 'react-native-video';
import { usePlayerStore } from "../hooks/usePlayerStore";
import { globalStyles } from "../presentation/themes/theme";

export const AudioPlayer: React.FC = () => {
    const videoRef = useRef<Video>(null);
    const {
        streamUrl,
        isPlaying,
        setError,
        setIsBuffering,
        setIsLoading,
        play,
    } = usePlayerStore();

    /*
     * Listeners de video component
     */ 
    const handleOnError = (error: any) => {
        console.error(`[AudioPlayer] Video error: ${error}`);
        setError(`Error de reproducción: ${error.error?.errorString ?? 'Desconocido'}`);
    };

    const handleOnBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
        setIsBuffering(isBuffering);
    };

    const handleOnLoadStart = () => {
        setIsLoading(true);
    };

    const handleOnLoad = () => {
        setIsLoading(false)
    };

    const handleOnAudioFocusChanged = (e: any) => {
        if(e.hasAudioFocus && isPlaying) play();
    };

    return (
        <Video
        ref={videoRef}
        source={{ uri: streamUrl }}
        paused={!isPlaying}
        playInBackground={true}
        ignoreSilentSwitch="ignore"
        style={globalStyles.player}
        onLoadStart={handleOnLoadStart}
        onLoad={handleOnLoad}
        onError={handleOnError}
        onBuffer={handleOnBuffer}
        onAudioFocusChanged={handleOnAudioFocusChanged}
        // controls={false}
        playWhenInactive={true} // Sigue reproduciendo cuando la app pierde el foco (iOS).
        />
    )

}