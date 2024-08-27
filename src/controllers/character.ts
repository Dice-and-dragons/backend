import { NextFunction, Request, Response } from "express";
import { CharacterDao } from "@/dao/character";
import { CharacterType } from "@/schemas/types";

export class CharacterController {
  constructor() {}

  public createCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = await CharacterDao.createCharacter(
      req.body.characterData,
      req.body.userId
    );
    return res.status(200).send(`Character created with id: ${id}`);
  };

  public deleteCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await CharacterDao.deleteCharacter(req.body.id.toString());
    return res.status(200).send("User successfully deleted");
  };

  public updateCharacter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await CharacterDao.updateCharacter(
      req.body.id.toString(),
      req.body.characterData
    );
    return res.status(200).send("User successfully updated");
  };
}
