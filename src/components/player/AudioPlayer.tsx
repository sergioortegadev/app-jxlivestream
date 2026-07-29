import React, { useRef } from "react";
import Video from 'react-native-video';
import { usePlayerStore } from "../../hooks/usePlayerStore";
import { globalStyles } from "../../presentation/themes/theme";

export const AudioPlayer: React.FC = () => {
    const videoRef = useRef(null);
    const {
        streamUrl,
        isPlaying,
        playerKey,
        setError,
        setIsBuffering,
        setIsLoading,
        pause,
        setWasPlayingBeforeLoss,
        startPlaybackHealthCheck,
    } = usePlayerStore();

    /*
     * Listeners de video component
     */ 
    const handleOnError = (error: any) => {
        console.error(`[AudioPlayer] error: `, error);

        if (isPlaying) {
            setWasPlayingBeforeLoss(true);
            pause();
        }
        
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
        startPlaybackHealthCheck();
    };

    const handleOnAudioFocusChanged = (e: any) => {
        if(e.hasAudioFocus && isPlaying) {}
    };

    return (
        <Video
        key={playerKey}
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