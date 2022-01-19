import { Request, Response } from "express";

export const currentUser = async (req: Request, res: Response) => {
  res.status(200).send({ user: req.currentUser || null });
};
