import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { colors, globalStyles } from "../../presentation/themes/theme";

interface Props {
    visible: boolean;
}

export const LoadingOverlay: React.FC<Props> = ({visible}) => {
    if (!visible) return null;

    return (
        <View style={globalStyles.containerLoadingOverlay}>
            <ActivityIndicator size='large' color={colors.liveColor} />
            <Text style={globalStyles.textLoadingOverlay}>Conectando con la transmisión...</Text>
        </View>
    );
};