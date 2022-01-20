import { signup } from "./sign-up";
import { signIn } from "./sign-in";
import { currentUser } from "./current-user";
import jwt from "jsonwebtoken";
import { refreshToken } from "./refresh-token";

const tokenExpiresIn: number = 60 * 15;
const refreshTokenExpiresIn: number = 60 * 60 * 24 * 365;

const generateToken = (expiresIn: number, email: string, id: any) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY!, { expiresIn });
};

export {
  signup,
  signIn,
  currentUser,
  generateToken,
  refreshToken,
  tokenExpiresIn,
  refreshTokenExpiresIn,
};
