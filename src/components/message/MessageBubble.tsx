import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from '../../presentation/themes/theme';
import {
  SentMessage,
  MessageStatus,
} from '../../types/message';

/* export type MessageStatus = 'sending' | 'sent' | 'failed';

export interface SentMessage {
    id: string,
    text: string,
    createdAt: Date,
    status: MessageStatus,
} */

interface Props {
  message: SentMessage;
  onRetry?: (message: SentMessage) => void;
}

const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
        case 'sending':
            return '⏳';
    
        case 'sent':
            return '✅';
    
        case 'failed':
            return '⚠️';
    
    
        default:
            return '';
    }
};

export const MessageBubble: React.FC<Props> = ({
    message,
    onRetry,
}) => {
    const retryEnabled = message.status === 'failed'

    return (
        <TouchableOpacity
        activeOpacity={retryEnabled ? 0.7 : 1}
        disabled={!retryEnabled}
        onPress={() => onRetry?.(message)}
        style={globalStyles.messageRow}
        >
            <View
            style={[
                globalStyles.messageBubble,
                retryEnabled && globalStyles.messageFailedBubble,
            ]}
            >
                <Text style={globalStyles.message}>
                    {message.text}
                </Text>

            <View style={globalStyles.messageFooter}>
                <Text style={globalStyles.messageTime}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>    

                <Text style={globalStyles.messageStatus}>
                    {getStatusIcon(message.status)}
                </Text>
            </View>

            {retryEnabled && (
                <Text style={globalStyles.messageRetry}>
                    reintentar
                </Text>
            )}
            </View>
        </TouchableOpacity>
    )
};