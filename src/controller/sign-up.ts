import { Request, Response } from "express";
import { User } from "../model/user";
import { hash } from "bcryptjs";
import { BadRequest } from "../error";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new BadRequest("This email is used");
  }

  const hashPw = await hash(password, 8);
  const createData = User.build({ email: email, password: hashPw });
  const user = await createData.save();
  res.status(201).send({ user });
};
