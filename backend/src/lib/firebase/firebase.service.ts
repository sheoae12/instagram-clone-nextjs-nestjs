import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";
import { Auth, UserRecord, getAuth } from "firebase-admin/auth";
import { getServiceAccount } from "src/config/firebase.config";
import serviceAccount from "./../../firebase-account.json";

export interface FirebaseUser {
    email?: string,
    phoneNumber?: string,
    password: string,
    displayName: string
}

@Injectable()
export class FirebaseService {
    app: admin.app.App;
    auth: Auth;
    logger: Logger;

    constructor(private configService: ConfigService) {
        this.app = admin.initializeApp({
            credential: admin.credential.cert(getServiceAccount(configService) as admin.ServiceAccount),
            databaseURL: `https://${configService.get<string>('firebase.projectId')}.firebaseio.com`,
            storageBucket: `${configService.get<string>('firebase.projectId')}.appspot.com`,
        });
        this.auth = getAuth(this.app);
        this.logger = new Logger(FirebaseService.name);
    }

    async createUser (user: FirebaseUser): Promise<UserRecord> {
        this.logger.debug(`create user ${user}`);
        console.log('user', user)

        try {
            return await this.auth.createUser({
                ...user,
                emailVerified: false,
                disabled: false
            });
        } catch (error) {
            console.error(error)
            this.logger.error(`[createUser] Failed to create firebase user: ${user}`);
            throw new InternalServerErrorException('create user failed');
        }    
    }
}