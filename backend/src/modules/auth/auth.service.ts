import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/repositories/user.repository";
import { SignInDto } from "./dto/req/sign-in.dto";
import { FirebaseService } from "src/lib/firebase/firebase.service";
import { SignUpDto } from "./dto/req/sign-up.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import { FirebaseUser } from "src/lib/firebase/firebase.service";
import { isEmail } from "src/common/util/regex";
import { genRandomId } from "src/common/util/auth";
import { User } from "src/entities/userinfo/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ProfileRepository } from "src/repositories/profile.repository";

@Injectable()
export class AuthService {
    logger = new Logger(AuthService.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly firebaseService: FirebaseService,
        private readonly jwtService: JwtService,
        private readonly profileRepository: ProfileRepository
    ) {}

    async signIn(payload: SignInDto) {
        const findUser = await this.userRepository.checkUserExist(payload.account);

        if (!findUser) {
            throw new NotFoundException('user not found')
        }

        // password check
        const userCredential = await this.firebaseService.authenticate(
            isEmail(payload.account) ? payload.account : findUser.account, 
            payload.password
        );

        const userInfo = await this.userRepository.getUserInfo(userCredential.user.email as string);
        const accessToken = this.jwtService.sign({ ...userInfo });
        const refreshToken = this.jwtService.sign({ auth: accessToken });

        this.logger.debug(`token ${accessToken}`)

        return { userInfo, accessToken, refreshToken };
    }

    async facebookSignIn(payload: any) {}

    async signUp(payload: SignUpDto) {
        this.logger.log('[signUp] Start Signup process');

        // account 중복체크 
        const accountExist = await this.userRepository.checkUserExist(payload.account);
        if (accountExist) {
            throw new ConflictException('account already exist');
        }

        // nickname 중복체크
        const nicknameExist = await this.userRepository.findOneBy({ nickname: payload.nickname });
        if (nicknameExist) {
            throw new ConflictException('nickname already exist');
        }

        const dbUser = plainToInstance(User, payload);
        const firebaseUser: FirebaseUser = {
            password: payload.password,
            displayName: payload.account,
        };

        if (isEmail(payload.account)) {
            firebaseUser.email = payload.account
        } else {
            const genInstagramEmail = `${genRandomId()}@instagram.com`;
            firebaseUser.email = genInstagramEmail;
            dbUser.phoneNumber = payload.account;
            dbUser.account = genInstagramEmail;
        }
    
        // phone number: e.g.) +82-10-1234-5678

        // firebase user 생성
        const userRecord = await this.firebaseService.createUser(firebaseUser);

        dbUser.firebaseUid = userRecord.uid;

        try {
            const result = await this.userRepository.createUser(dbUser);
            return result;
        } catch (error) {
            console.error(error);
            this.logger.error(`[signUp] signup error`);
            throw new InternalServerErrorException('signup error');
        }
    }

    async deleteUser(userId: any) {
        try {
            await this.userRepository.delete(userId);
            return 'true';
        } catch (error) {
            this.logger.error(`[deleteUser] user deletion error`);
            throw new InternalServerErrorException('deleteUser error');
        }
        
    }

    async testJwt(text: string) {
        const jwt = this.jwtService.sign({text});
        return jwt;
    }
}