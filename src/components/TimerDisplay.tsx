import React, { useEffect, useRef } from "react"
import { Text, View, Animated, Easing } from "react-native"
import { globalStyles } from "../presentation/themes/theme";
import LinearGradient from "react-native-linear-gradient";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface Props {
    elapsedSeconds: number;
    isPlaying: boolean;
    isPaused: boolean;
}

const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const TimerDisplay: React.FC<Props> = ({ elapsedSeconds, isPlaying, isPaused }) => {
    const shine = useRef(new Animated.Value(-120)).current;
    
    useEffect(() => {
        Animated.loop(
            Animated.timing(shine, {
                toValue: 220,
                duration: 2500,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    }, [shine]);
    
    if (!isPlaying) return null;
    
    return (
        <View style={globalStyles.containerTimerDisplay}>
            <View style={globalStyles.timerBox}>
                <Animated.View
                 style={[
                        globalStyles.shine,
                        {
                            transform: [
                                { translateX: shine },
                                { skewX: '-20deg' },
                            ],
                        },
                ]}
                >
                    <LinearGradient
                        colors={[
                            'transparent',
                            '#219bff05',
                            '#44abff30',
                            '#219bff05',
                            'transparent',
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={globalStyles.containerFlex}
                        />
                </Animated.View>
                <Text style={globalStyles.timerText}>{formatTime(elapsedSeconds)}</Text>
                <Text style={globalStyles.subText}>Playing</Text>
            </View>
        </View>
    );
};