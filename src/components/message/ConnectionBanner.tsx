import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../../presentation/themes/theme";

interface Props {
    connected: boolean;
}

export const ConnectionBanner: React.FC<Props> = ({ connected }) => {

  const [visible, setVisible] = useState(true)
  
  useEffect(()=>{
    if(connected) {
      setVisible(true)

      setTimeout(() => {
        setVisible(false)
      }, 2000);
      
    } else {
      setVisible(false)
    }
  },[connected])

    if (connected) {
        if(!visible) return null;

        return (
          <View style={globalStyles.messageReady}>
            <Text style={globalStyles.messageReadyText}>
              🟢 Transmisión activa. Puedes enviar mensajes
            </Text>
          </View>
    );
    }

  return (
      <View style={globalStyles.messageOffline}>
        <Text style={globalStyles.messageOfflineText}>
          🔴 Transmisión no conectada.
        </Text>
        <Text style={globalStyles.messageOfflineSub}>
          Envío de mensajes está deshabilitado.
        </Text>
      </View>
  );
}