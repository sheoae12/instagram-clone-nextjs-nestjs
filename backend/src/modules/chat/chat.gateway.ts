import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('hello')
    handleMessage(client: any, payload: any): string {
        return 'Hello World!';
    }

    emitEventToClient(event: string, data: any, clientId: string): void {
        this.server.to(clientId).emit(event, data);
    }
}