import { Request, Response } from "express";
import { User } from "../model/user";
import { compare } from "bcryptjs";
import { BadRequest } from "../error";
import { refreshTokenExpiresIn, tokenExpiresIn, generateToken } from ".";

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

  const { email: userEmail, _id } = existingUser;

  const token = generateToken(tokenExpiresIn, userEmail, _id);

  const refreshToken = generateToken(refreshTokenExpiresIn, userEmail, _id);

  res.status(200).send({ user: existingUser, token, refreshToken });
};
