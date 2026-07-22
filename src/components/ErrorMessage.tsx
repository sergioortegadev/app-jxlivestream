import React from "react"
import { Text, View } from "react-native"
import { globalStyles } from "../presentation/themes/theme";

interface Props {
    error: string | null;
    isReconnecting: boolean;
}

export const ErrorMessage: React.FC<Props> = ({ error, isReconnecting }) => {
    if (!error || isReconnecting) return null;

    return (
        <View style={globalStyles.errorCard}>
            <Text style={globalStyles.errorText}>{error}</Text>
        </View>
    );
};