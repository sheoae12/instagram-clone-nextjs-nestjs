import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Auth as AdminAuth, UserRecord } from "firebase-admin/auth";
import { FirebaseApp } from "firebase/app";
import { getAdminAuth, getFirebaseAppAuth } from "src/config/firebase.config";
import { Auth, UserCredential, getAuth, signInWithEmailAndPassword, signInWithPhoneNumber  } from "firebase/auth";

export interface FirebaseUser {
    email?: string,
    phoneNumber?: string,
    password: string,
    displayName: string
}

@Injectable()
export class FirebaseService {
    app: Auth;
    admin: AdminAuth;
    logger: Logger;

    constructor(private configService: ConfigService) {
        this.admin = getAdminAuth(configService);
        this.app = getFirebaseAppAuth(configService);
        this.logger = new Logger(FirebaseService.name);
    }

    async createUser(user: FirebaseUser): Promise<UserRecord> {
        this.logger.debug(`create firebase user ${user}`);

        try {
            return await this.admin.createUser({
                ...user,
                emailVerified: false,
                disabled: false
            });
        } catch (error: any) {
            console.error(error)
            this.logger.error(`[createUser] Failed to create firebase user: ${user.displayName}`);

            if (error.code === 'auth/email-already-exists') {
                throw new ConflictException('firebase error: user mail exist');
            }

            throw new InternalServerErrorException('firebase error: create user');
        }    
    }

    async authenticate(email: string, password: string): Promise<UserCredential> {
        this.logger.debug(`authenticate firebase user ${email}`);

        try {
            return await signInWithEmailAndPassword(this.app, email, password);
        } catch (error: any) {
            console.error(error)
            this.logger.error(`[signIn] Failed to authenticate firebase user: ${email}`);
            
            throw new UnauthorizedException('password incorrect');
        }
    }

    async checkUserByEmail(email: string): Promise<UserRecord> {
        this.logger.debug(`find user by email: ${email}`);

        try {
            return await this.admin.getUserByEmail(email);
        } catch (error) {
            console.error(error)
            this.logger.error(`[checkUserByEmail] Failed to find firebase user: ${email}`);
            throw new InternalServerErrorException(`firebase error: find user`);
        }
    }

    async checkUserByPhoneNumber(phoneNumber: string): Promise<UserRecord> {
        this.logger.debug(`find user by phoneNumber: ${phoneNumber}`);

        try {
            return await this.admin.getUserByPhoneNumber(phoneNumber);
        } catch (error) {
            console.error(error)
            this.logger.error(`[checkUserByPhoneNumber] Failed to find firebase user: ${phoneNumber}`);
            throw new InternalServerErrorException(`firebase error: find user`);
        }
    }
}