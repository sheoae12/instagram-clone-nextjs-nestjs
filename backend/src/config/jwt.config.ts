import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export const JwtConfig = (
    configService: ConfigService
): JwtModuleOptions => {
    return {
        global: true,
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
            expiresIn: '1day'
        }
    };
};