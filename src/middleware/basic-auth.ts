import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const basicAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const base64Credentials = req.get("Authorization")?.split(" ")[1];
  if (!base64Credentials) {
    return next();
  }
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  
  const [username, password] = credentials.split(":");

  

  next();
};
