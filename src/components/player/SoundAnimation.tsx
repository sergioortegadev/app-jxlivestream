import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { globalStyles } from '../../presentation/themes/theme';


const SIZE = 60;
const BAR_WIDTH = 16;
const MIN_SCALE = 0.1;
const MID_SCALE = 0.9;

type BarProps = {
  delay: number;
};


const Bar: React.FC<BarProps> = ({ delay }) => {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(MIN_SCALE, {duration: 200, easing: Easing.linear}),
                    withTiming(MID_SCALE, {duration: 200, easing: Easing.linear}),
                    withTiming(1, {duration: 200, easing: Easing.linear}),
                    withTiming(1, {duration: 400, easing: Easing.linear}),
                ),
                -1,
                false,      
            ),
        );
    }, [delay, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: scale.value }],
    }));
    
  return <Animated.View style={[localStyles.bar, animatedStyle]} />;
};


export const SoundAnimation: React.FC = () => {
  return (
    <View style={globalStyles.soundAnimation} >
      <View style={localStyles.container}>
        <Bar delay={0} />
        <Bar delay={737} />
        <Bar delay={62} />
        <Bar delay={381} />
        <Bar delay={953} />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
    container: {
    width: SIZE,
    height: SIZE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: BAR_WIDTH,
    height: SIZE,
    backgroundColor: '#999',
    borderRadius: 2,
    transformOrigin: 'bottom',
    marginHorizontal: 2,
  },
});