import { FakeSocketClient } from './socket/FakeSocketClient';
import { MessageService } from './message/MessageService';

const socketClient = new FakeSocketClient();

export const messageService =
    new MessageService(socketClient);

    
/* cuando se implemente el socket en el backend cambiamos aquí:

const socketClient = new SocketIoClient();

    */