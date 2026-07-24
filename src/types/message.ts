export type MessageStatus = 'sending' | 'sent' | 'failed';

export interface SentMessage {
    clientId: string;
    serverId?: string;
    text: string;
    createdAt: string;
    status: MessageStatus;
    error?: string;
}

export interface SendMessagePayload {
    clientId: string;
    text: string;
    createdAt: string;
}

export interface SendMessageResponse {
  success: boolean;
  clientId: string;
  serverId?: string;
  receivedAt?: string;
  error?: string;
}