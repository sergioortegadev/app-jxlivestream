import { SendMessagePayload, SendMessageResponse } from "../../types/message";
import { ISocketClient } from "./ISocketClient";

export class FakeSocketClient implements ISocketClient {
    async sendMessage (
        payload: SendMessagePayload,
    ): Promise<SendMessageResponse> {

        const delay = 500 + Math.random() * 1000;

        await new Promise<void>(resolve => setTimeout(resolve, delay));

        return {
            success: true,
            clientId: payload.clientId,
            serverId: Date.now().toString() + '-' + Math.random().toString(36).slice(2),
            receivedAt: new Date().toISOString(),
        }
    }
}