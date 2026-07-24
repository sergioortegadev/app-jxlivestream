import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../../presentation/themes/theme";

interface Props {
    isLive: boolean;
    hasError: boolean;
}

export const StatusBadge: React.FC<Props> = ({ isLive, hasError }) => {
    if (hasError && !isLive) return null;

    return (
        <View style={globalStyles.containerStatusBadge}>
            {isLive ? (
                <View style={globalStyles.liveBadge} >
                    <Text style={globalStyles.liveText}>🟢 Estamos en VIVO</Text>
                </View>
            ) : (
                <View style={globalStyles.offlineBadge}>
          <Text style={globalStyles.offlineText}>No estamos transmitiendo, o se perdió la transmisión. Aguarde unos minutos y recargue.</Text>
        </View>
            )}
        </View>
    );
};