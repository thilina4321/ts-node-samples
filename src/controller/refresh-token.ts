import { Request, Response } from "express";
import { refreshTokenExpiresIn, tokenExpiresIn, generateToken } from ".";

export const refreshToken = async (req: Request, res: Response) => {
  const { id, email } = req.currentUser!;

  const token = generateToken(tokenExpiresIn, email, id);
  const refreshToken = generateToken(refreshTokenExpiresIn, email, id);

  res.status(200).send({ token, refreshToken });
};
