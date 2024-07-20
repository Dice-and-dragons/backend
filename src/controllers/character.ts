import { NextFunction, Request, Response } from "express";
import { CharacterDao } from "@/dao/character";

export class ChatController {
  constructor() {}

  public createCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = CharacterDao.createCharacter(req.query.characterData, req.query.userId);
  };
}
