import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Auth as AdminAuth, UserRecord } from "firebase-admin/auth";
import { FirebaseApp } from "firebase/app";
import { getAdminAuth, getFirebaseApp } from "src/config/firebase.config";
import { Auth, UserCredential, getAuth, signInWithEmailAndPassword, signInWithPhoneNumber  } from "firebase/auth";
import { FirebaseStorage, StorageReference, deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getUnixTime } from "src/common/util/date";

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
    storage: FirebaseStorage;

    constructor(private configService: ConfigService) {
        this.admin = getAdminAuth(configService);
        this.app = getAuth(getFirebaseApp(configService));
        this.logger = new Logger(FirebaseService.name);
        this.storage = getStorage(getFirebaseApp(configService));
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

    async uploadImageFile(file: Express.Multer.File) {
        this.logger.debug(`upload image file to firebase storage`);
        this.logger.debug(`${file.filename}`)

        const filename = `${getUnixTime()}_${encodeURI(file.originalname)}`;

        const storageRef = ref(this.storage, filename);
        const metadata = { contentType: file.mimetype };

        try {
            await uploadBytes(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(storageRef);

            return { url: downloadURL };
        } catch (error) {
            console.error(error);
            this.logger.error(`${error}`)
            this.logger.error(`[uploadImageFile] Failed to upload firebase storage: ${file.filename}`);
            throw new InternalServerErrorException(`firebase error: upload file`);
        }
    }

    async deleteImageFile(ref: StorageReference) {
        this.logger.debug(`delete image file from firebase storage`);
        try {
            return await deleteObject(ref);
        } catch (error) {
            this.logger.error(`[deleteImageFile] Failed to delete from firebase storage: ${ref.name}`)
            throw new InternalServerErrorException(`firebase error: delete file`);
        }
    }
}