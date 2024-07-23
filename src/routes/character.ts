import { CharacterController } from "@/controllers/character";
import { Router } from "express";

export class CharacterRouter {
  router: Router;
  path: string;
  controller: CharacterController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new CharacterController();
    this.router.post("/create", this.controller.createCharacter);
    this.router.post("/update", this.controller.updateCharacter);
    this.router.post("/delete", this.controller.deleteCharacter);
  }
}
