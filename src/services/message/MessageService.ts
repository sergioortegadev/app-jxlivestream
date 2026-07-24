import { SendMessagePayload, SendMessageResponse } from "../../types/message";
import { ISocketClient } from "../../services/socket/ISocketClient";

export class MessageService {

    constructor (
        private socket: ISocketClient,
    ) {}

    sendMessage (
        payload: SendMessagePayload,
    ): Promise<SendMessageResponse> {
        return this.socket.sendMessage(payload);
    }
}