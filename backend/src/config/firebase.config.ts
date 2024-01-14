import { ConfigService } from "@nestjs/config";

export const getServiceAccount = (configService: ConfigService) => {
    return {
        type: configService.get<string>('firebase.type'),
        project_id: configService.get<string>('firebase.projectId'),
        private_key_id: configService.get<string>('firebase.privateKeyId'),
        private_key: configService.get<string>('firebase.privateKey'),
        client_email: configService.get<string>('firebase.clientEmail'),
        client_id: configService.get<string>('firebase.clientId'),
        auth_uri: configService.get<string>('firebase.authUri'),
        token_uri: configService.get<string>('firebase.tokenUri'),
        auth_provider_x509_cert_url: configService.get<string>('firebase.authCertUrl'),
        client_x509_cert_url: configService.get<string>('firebase.clientCertUrl'),
        universe_domain: configService.get<string>('firebase.universeDomain'),
    }
}