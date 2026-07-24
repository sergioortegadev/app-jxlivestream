import React from "react"
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../../presentation/themes/theme';

interface Props {
    value: string;
    disabled: boolean;
    onChangeText: (text: string) => void;
    onSend: () => void;
}

export const MessageInput: React.FC<Props> = ({ 
    value,
    disabled,
    onChangeText,
    onSend,
    }) => {
        const sendDisabled = disabled || value.trim().length === 0;

        return (
            <View style={globalStyles.messageContainer}>
                <TextInput
                style={[
                    globalStyles.messageInput,
                    disabled && globalStyles.messageInputDisabled,
                ]}
                placeholder="Escribe tu mensaje..."
                editable={!disabled}
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={onSend}
                maxLength={500}
                onChangeText={onChangeText}
                value={value}
                />

                <TouchableOpacity
                style={[
                    globalStyles.messageButton,
                    sendDisabled && globalStyles.messageButtonDisabled,
                ]}
                onPress={onSend}
                >
                    <Text style={globalStyles.messageBtnText}>
                        Enviar
                    </Text>
                </TouchableOpacity>
            </View>
    );
};