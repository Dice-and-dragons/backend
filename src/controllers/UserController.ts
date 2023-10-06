import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UserRepository";
import { TokenGenerator } from "../utils/Tokens";
import { ErrorGenerator } from "../utils/ErrorGenerator";
import cookie from "cookie";
import { UserSchema } from "../schemas/userSchema";
import { UserProfileRepository } from "../repositories/UserProfileRepository";

export class UserController {
    static userRepo: UsersRepository;
    static tokenGenerator: TokenGenerator;
    static userProfileRepo: UserProfileRepository;

    constructor() {
        TokenGenerator.tokenGenerator = new TokenGenerator();
        UserController.userRepo = new UsersRepository();
        UserController.userProfileRepo = new UserProfileRepository();
    }

    public async registerUser(req: Request, res: Response) {
        try {
            const newUser: UserSchema = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                created_on: new Date(),
                last_login: new Date(),
                language: 'en'
            };

            if (!newUser.username || !newUser.password || !newUser.email) {
                throw new ErrorGenerator(400, 'Bad request');
            }

            const existingUser = await UserController.userRepo.getUserByEmail(newUser.email);
            if (existingUser) {
                throw new ErrorGenerator(409, 'User already exists');
            }

            UserController.userRepo.createUser(newUser);
            UserController.userProfileRepo.createProfile(newUser.username);
            const token = TokenGenerator.tokenGenerator.generateToken(newUser.username);
            return res.status(200).send({ message: 'User created successfully', token });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorGenerator) {
                throw new ErrorGenerator(error.status, error.message);
            } else {
                throw new ErrorGenerator(500, 'Internal server error');
            }
        }
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const token = cookies.token;

            if (!token || token === '') {
                return res.status(400).send({ message: 'Missing parameters' });
            } else {
                const decoded = new TokenGenerator().verifyToken(token);
                if (!decoded || typeof decoded !== 'object' || !('username' in decoded)) {
                    return res.status(400).send({ message: 'Invalid token' });
                }

                const db = new UsersRepository();
                const user = await db.getUserByEmail(decoded.username as string);
                const refreshedToken = new TokenGenerator().refreshToken(token);
                if (user === null) {
                    return res.status(400).send({ message: 'Invalid token' });
                } else {
                    return res.status(200).send({ message: 'User logged in successfully', refreshedToken });
                }
            }
        } catch (error: any) {
            throw new Error(`Error logging in user: ${error.message}`);
        }
    }

    public async changeLanguage(req: Request, res: Response) {
        try {
            const { email, language } = req.body;
            if (!email || !language) {
                return res.status(400).send({ message: 'Missing parameters' });
            }
            await UserController.userRepo.changeLanguage(email, language);
            return res.status(200).send({ message: 'Language changed successfully' });
        } catch (error:any) {
            throw new Error(`Error changing language: ${error.message}`);
        }
    }
    
}
