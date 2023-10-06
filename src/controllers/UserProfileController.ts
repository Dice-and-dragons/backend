import { UserProfileRepository } from "../repositories/UserProfileRepository";
import { Request, Response } from "express";
import { ErrorGenerator } from "../utils/ErrorGenerator";

export class UserProfileController {
    static userProfileRepo: UserProfileRepository;

    constructor() {
        UserProfileController.userProfileRepo = new UserProfileRepository();
    }

    public async updateProfilePicture(req: Request, res: Response) {
        const { username, pfp } = req.body;
        try {
            if (!username || !pfp) {
                return res.status(400).send({ message: 'Missing parameters' });
            }
            await UserProfileController.userProfileRepo.updateProfilePicture(username, pfp);
            return res.status(200).send({ message: 'Profile picture updated successfully' });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorGenerator) {
                throw new ErrorGenerator(error.status, error.message);
            } else {
                throw new ErrorGenerator(500, 'Internal server error');
            }
        }

    }

    public async updateUser(req: Request, res: Response) {
        try {
            const updateType = req.query.updateType as string;
            if (!updateType) {
                return res.status(400).send({ message: 'Missing parameters' });
            }
    
            switch (updateType) {
                case 'username':
                    await UserProfileController.userProfileRepo.updateUsername(req.body.newUsername, req.body.oldUsername);
                    break;
                case 'email':
                    await UserProfileController.userProfileRepo.updateEmail(req.body.username, req.body.email);
                    break;
                case 'password':
                    await UserProfileController.userProfileRepo.updatePassword(req.body.username, req.body.password);
                    break;
                default:
                    return res.status(400).send({ message: 'Invalid parameter' });
            }
            return res.status(200).send({ message: 'User updated successfully' });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorGenerator) {
                throw new ErrorGenerator(error.status, error.message);
            } else {
                throw new ErrorGenerator(500, 'Internal server error');
            }
        }
    }

    public async getProfile(req: Request, res: Response) {
        const { username } = req.body;
        try {
            if (!username) {
                return res.status(400).send({ message: 'Missing parameters' });
            }
            const profile = await UserProfileController.userProfileRepo.getProfile(username);
            return res.status(200).send({ message: 'Profile retrieved successfully', profile });
        } catch (error: any) {
            console.error(error);
            if (error instanceof ErrorGenerator) {
                throw new ErrorGenerator(error.status, error.message);
            } else {
                throw new ErrorGenerator(500, 'Internal server error');
            }
        }
    }
}