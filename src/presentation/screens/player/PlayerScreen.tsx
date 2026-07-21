import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native"
import Video from 'react-native-video';
import { usePlayerStore } from '../../../hooks/usePlayerStore';
import { globalStyles } from '../../themes/theme';

interface Props {

}

export const PlayerScreen: React.FC = ({}: Props) => {
  const { isLive, error, isReconnecting, isPlaying, retryCount, maxRetries, streamUrl, play, pause, stop, setError, setIsBuffering } = usePlayerStore();

  return (
    <View style={[
      globalStyles.mainContainer, 
      globalStyles.mainContainerCentered
      ]}>

      {/* ========== AUDIO PLAYER (invisible) ========== */}
        <Video
          source={{ uri: streamUrl }}
          paused={!isPlaying}
          playInBackground={true}
          ignoreSilentSwitch="ignore"
          style={globalStyles.player}
          onError={(e) => {
            setError(`Error de reproducción: ${e.error?.errorString ?? 'desconocido'}`);
            // No llamamos stop() para no desmontar el componente y poder recuperar sin reload
          }}
          onBuffer={({ isBuffering }) => setIsBuffering(isBuffering)}
          onAudioFocusChanged={(e) => {
            // En emulador Android, ajustar volumen pierde/recupera el audio focus
            // Cuando vuelve el focus, reanudamos si estaba reproduciendo
            if (e.hasAudioFocus) {
              play();
            }
          }}
        />
        
       {/* ========== SECTION 1: STATUS BADGE ========== */}
      <View style={globalStyles.statusCard}>
        { isLive ? (
          <View style={globalStyles.liveBadge}>
            <Text style={globalStyles.liveText}>🟢 Estamos en VIVO</Text>
          </View>
        ) : (
           error === null ? ( 
            <View style={globalStyles.offlineBadge}>
            <Text style={globalStyles.offlineText}>❌ No estamos transmitiendo</Text>
            </View>
          ) : (
            ''
          )
        )}
      </View>

      {/* ========== SECTION 2: RECONECTING STATE ========== */}
      {isReconnecting && (
        <View style={globalStyles.reconnectingCard}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={globalStyles.reconnectingText}>
            Reconectando... ({retryCount}/{maxRetries})
          </Text>
        </View>
      )}

      {/* ========== SECTION 3: ERROR MESSAGE ========== */}
      {error && !isReconnecting && (
        <View style={globalStyles.errorCard}>
          <Text style={globalStyles.errorText}>{error}</Text>
        </View>
      )}

      {/* ========== SECTION 4: PLAYBACK CONTROLS ========== */}
      {isLive && !error && (
        <View style={globalStyles.controlsContainer}>

          {
            !isPlaying ?
             <TouchableOpacity
              style={[globalStyles.button, globalStyles.playingButton]}
              onPress={play}
              activeOpacity={0.7}
            >
              <Text style={globalStyles.buttonText}>▶  PLAY</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.grayButton]}
              onPress={pause}
              activeOpacity={0.7}
            >
              <Text style={globalStyles.buttonText}>PAUSE</Text>
            </TouchableOpacity>
          }

            <TouchableOpacity
              style={[globalStyles.button, globalStyles.stopButton]}
              onPress={stop}
              activeOpacity={0.7}
            >
              <Text style={globalStyles.buttonText}>STOP</Text>
            </TouchableOpacity>
        </View>
      )}

      {/* ========== INFO ========== */}
      <View style={globalStyles.infoContainer}>
        <Text style={globalStyles.infoText}>
          {isLive ? 'Escuchá la transmisión en vivo' : 'Aguardando transmisión'}
        </Text>
      </View>      

    </View>
  )
};