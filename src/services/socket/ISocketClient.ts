import { SendMessagePayload, SendMessageResponse } from "../../types/message";

export interface ISocketClient {
    sendMessage (
        payload: SendMessagePayload,
    ): Promise<SendMessageResponse>
}
/* 
 No aparecen connect() ni disconnect(), porque el fake no los necesita. Cuando implementemos Socket.IO podremos extender esta interfaz sin romper el resto del código.
*/