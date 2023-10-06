import { Router } from "express";
import { SpellsController } from "../controllers/SpellsController";

export class SpellsRouter {
    router: Router;
    path: string;
    spellsController: SpellsController;

    constructor(path: string) {
        (this.router = Router()), (this.path = path), (this.spellsController = new SpellsController());
        this.router.get('/getAllSpells', this.spellsController.getSpells);
        
    }
}