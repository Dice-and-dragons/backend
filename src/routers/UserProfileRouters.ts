import { UserProfileController } from "../controllers/UserProfileController";
import { Router } from "express";

export class UserProfileRouter {
router: Router;
path: string;
userProfileController: UserProfileController;

constructor(path: string) {
    (this.router = Router()), (this.path = path), (this.userProfileController = new UserProfileController());
    this.router.post('/updateProfilePicture', this.userProfileController.updateProfilePicture);
    this.router.post('/updateUser', this.userProfileController.updateUser);
}
}