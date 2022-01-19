import { Request, Response } from "express";
import { User } from "../model/user";
import { compare } from "bcryptjs";
import { BadRequest } from "../error";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new BadRequest("Please check your email and password");
  }
  let comPw;
  if (existingUser.password) {
    comPw = await compare(password, existingUser.password);
  }

  if (!comPw) {
    throw new BadRequest("Please check your email and password");
  }

  const token = jwt.sign(
    { email: existingUser.email, id: existingUser._id },
    process.env.JWT_KEY!
  );
  res.status(200).send({ user: existingUser, token });
};
