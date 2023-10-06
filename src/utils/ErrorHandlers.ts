import { Request, Response, NextFunction } from "express";

const handleNotFound = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.log("Route not found");
    res.status(404);
    res.send(`Route not found for: ${req.path}`);
    return next();
  };
  
  const handleError = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    if (res.headersSent) {
      return next(err);
    }
  
    console.error(err);
    return res.status(500).json(err.message);
  };
  
  export { handleNotFound, handleError };
  