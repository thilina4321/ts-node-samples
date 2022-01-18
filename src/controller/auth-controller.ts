import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../model/user";
import { DatabaseConnection, RequestError } from "@ticketsz/common";
import bcrypt from "bcryptjs";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const signupUser = async (req: Request, res: Response) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new RequestError(error.array());
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Already registered user!" });
    }
    const hash = await bcrypt.hash(password, 8);

    const user = await User.build({ email, password: hash });
    const savedUser = await user.save();

    return res
      .status(201)
      .send({ user: savedUser, token: "this is the token" });
  } catch (error) {
    throw new DatabaseConnection();
  }
};
