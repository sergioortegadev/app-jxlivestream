import { RefreshControl, ScrollView, Text, View } from "react-native"
import { usePlayerStore } from '../../../hooks/usePlayerStore';
import { colors, globalStyles } from '../../themes/theme';
import { AudioPlayer } from "../../../components/AudioPlayer";
import { LoadingOverlay } from "../../../components/LoadingOverlay";
import { StatusBadge } from "../../../components/StatusBadge";
import { TimerDisplay } from "../../../components/TimerDisplay";
import { ReconnectingOverlay } from "../../../components/ReconnectingOverlay";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { PlayerControl } from "../../../components/PlayerControl";
import { useState } from "react";



interface Props {

}

export const PlayerScreen: React.FC = ({}: Props) => {
  const { isLive, error, isReconnecting, isPlaying, isPaused, isLoading, retryCount, maxRetries, elapsedTime, play, pause, stop, initializeStream, reset } = usePlayerStore();
  const [ refreshing, setRefreshing ] = useState(false);

  const handleRefreshing = async () => {
    setRefreshing(true);
    reset();

    await new Promise<void>(resolve => setTimeout(resolve, 500));

    await initializeStream();

    setRefreshing(false);
  };

  return (
    <ScrollView 
    style={[globalStyles.mainContainer]}
    contentContainerStyle={globalStyles.mainContainerCentered}
    refreshControl={
      <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefreshing}
      tintColor={colors.liveColor}
      progressBackgroundColor={colors.background}
      />
    }
    //scrollEnabled={false}
    > 
   
        {/* ===== Nuevo Player ===== */}
          <TimerDisplay elapsedSeconds={elapsedTime} isPlaying={isPlaying} isPaused={isPaused} />
          
          <AudioPlayer />

          <LoadingOverlay visible={isLoading} />

          <StatusBadge isLive={isLive} hasError={!!error} />

          <ReconnectingOverlay visible={isReconnecting} retryCount={retryCount} maxRetries={maxRetries} />

          <ErrorMessage error={error} isReconnecting={isReconnecting} />

          {isLive && !error && (
            <PlayerControl
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onStop={stop}
            />
          )}

          <View style={globalStyles.infoContainer}>
            <Text style={globalStyles.infoText}>
              {isLive ? 'Escuchá la transmisión en vivo' : 'Aguardando transmisión'}
            </Text>
          </View>
       
    </ScrollView>
  )
};