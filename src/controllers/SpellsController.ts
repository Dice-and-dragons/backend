import { Request, Response } from "express";
import { SpellsRepository } from "../repositories/SpellsRepository";
import { ErrorGenerator } from "../utils/ErrorGenerator";

export class SpellsController {
    static spellsRepo: SpellsRepository;

    constructor() {
        SpellsController.spellsRepo = new SpellsRepository();
    }

    public async getSpells(req: Request, res: Response) {
      try {
        const spells = await SpellsController.spellsRepo.getAllSpells();
        return res.status(200).send({ spells });
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