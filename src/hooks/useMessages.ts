import { useCallback, useEffect, useState } from "react";
import { SendMessagePayload, SentMessage } from '../types/message';
import { messageService } from "../services";

interface UseMessageProps {
    publisherConnected: boolean;
}

const MAX_HISTORY = 30;

const createdClientId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useMessage = ({ publisherConnected }: UseMessageProps) => {
    const [messages, setMessages] = useState<SentMessage[]>([])

    const updateMessage = useCallback(
        (
            clientId: string,
            changes: Partial<SentMessage>
        ) => {
            setMessages(prev =>
                prev.map(message =>
                    message.clientId === clientId 
                    ? {
                        ...message,
                        ...changes,
                    }
                    : message,
                ),
            );
        },
        [],
    );

    const sendPayload = useCallback(
        async (payload: SendMessagePayload) => {
            try {
                const response = await messageService.sendMessage(payload);

                if (response.success) {
                    updateMessage(payload.clientId, {
                        status: 'sent',
                        serverId: response.serverId,
                        error: undefined,
                    });

                    return
                }

                updateMessage(payload.clientId, {
                    status: 'failed',
                    error: response.error,
                });
            } catch (error) {
                updateMessage(payload.clientId, {
                    status: 'failed',
                    error: 
                        error instanceof Error
                            ? error.message
                            : 'Error desconocido'
                });
            }
        },
        [updateMessage],
    );

    const sendMessage = useCallback(
        (text: string) => {
            if (!publisherConnected) return;

            const payload: SendMessagePayload = {
                clientId: createdClientId(),
                text,
                createdAt: new Date().toISOString(),
            };

            const message: SentMessage = {
                ...payload,
                status: 'sending',
            }

            setMessages(prev => 
            [...prev, message].slice(-MAX_HISTORY),
            );

            sendPayload(payload);
        },
        [publisherConnected, sendPayload],
    );

    const retryMessage = useCallback(
        (message: SentMessage) => {
            
            updateMessage(message.clientId,{
            status:'sending',
            error:undefined,
            });

            const payload: SendMessagePayload = {
                clientId: message.clientId,
                text: message.text,
                createdAt: message.createdAt,
            };

            sendPayload(payload);
        },
        [sendPayload, updateMessage],
    );

    const clearHistory = useCallback(() => {
        setMessages([]);
    }, []);

    useEffect(() => {
        if (publisherConnected) return

        setMessages(prev => prev.map(message =>
            message.status === 'sending'
            ? {
                ...message,
                status: 'failed',
                error: 'La transmisión interrumpida',
            }
            : message,
        ),
    );
    }, [publisherConnected]);

    return {
        messages,
        sendMessage,
        retryMessage,
        clearHistory,
    }
}