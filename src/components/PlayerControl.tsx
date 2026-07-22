import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { globalStyles } from "../presentation/themes/theme";

interface Props {
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onStop: () => void;
}

export const PlayerControl: React.FC<Props> = ({
    isPlaying,
    onPlay,
    onPause,
    onStop
}) => {
  return (
    <View style={globalStyles.containerPlayerControl}>
        {!isPlaying ? (
            <TouchableOpacity
            style={[globalStyles.button, globalStyles.playingButton]}
            onPress={onPlay}
            activeOpacity={0.7}
            >
                <Text style={globalStyles.buttonText}>Play</Text>
            </TouchableOpacity>
        ) : (

            <TouchableOpacity
            style={[globalStyles.button, globalStyles.grayButton]}
            onPress={onPause}
            activeOpacity={0.7}
            >
                <Text style={globalStyles.buttonText}>Pausa</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity 
        style={[globalStyles.button, globalStyles.stopButton]}
        onPress={onStop}
        activeOpacity={0.7}
        >
            <Text style={globalStyles.buttonText}>Stop</Text>
        </TouchableOpacity>
    </View>
  );
};