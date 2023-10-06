import { UserController } from "../controllers/UserController";
import { Router } from "express";

export class UserRouter {
router: Router;
path: string;
userController: UserController;

constructor(path: string) {
    (this.router = Router()), (this.path = path), (this.userController = new UserController());
    this.router.post('/register', this.userController.registerUser);
    this.router.post('/login', this.userController.loginUser);
    this.router.post('/changeLanguage', this.userController.changeLanguage);
}
}
