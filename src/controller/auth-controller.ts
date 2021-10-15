import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../model/user";

export const signupUser = async (req: Request, res: Response) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).send({ error: error.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" });
  }
};
