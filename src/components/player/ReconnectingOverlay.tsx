import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { globalStyles, colors } from '../../presentation/themes/theme';

interface Props {
    visible: boolean;
    retryCount: number;
    maxRetries: number;
}

export const ReconnectingOverlay: React.FC<Props> = ({
    visible,
    retryCount,
    maxRetries
}) => {
    if (!visible) return null;

    return (
        <View style={globalStyles.containerReconnectingOverlay}>
            <ActivityIndicator size={'large'} color={colors.liveColor} />
            <Text style={globalStyles.reconnectingText}>
                Reconectando... ({retryCount} / {maxRetries})
            </Text>
        </View>
    );
};