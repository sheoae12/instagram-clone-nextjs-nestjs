import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('Instagram Clone')
    .setDescription('API for Instagram Clone Project')
    .setVersion('1.0')
    .build();