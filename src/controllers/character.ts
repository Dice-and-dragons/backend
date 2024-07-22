import { NextFunction, Request, Response } from "express";
import { CharacterDao } from "@/dao/character";

export class CharacterController {
  constructor() {}

  public createCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = CharacterDao.createCharacter(
      req.query.characterData,
      req.query.userId.toString()
    );
    return res.status(200).send(`Character created with id: ${id}`);
  };

  public deleteCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await CharacterDao.deleteCharacter(req.query.id.toString());
    return res.status(200).send("User successfully deleted");
  };
}
