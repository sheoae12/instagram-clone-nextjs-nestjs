import { Module } from "@nestjs/common";
import { EventGateway } from "../event/event.gateway";


@Module({
    imports: [],
    providers: [EventGateway]
})
export class ChatModule {}
