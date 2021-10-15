import express from "express";
import { signupUser } from "../controller/auth-controller";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/auth/create-user",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Minimum lenght shoud be 5"),
  ],
  signupUser
);

export {router as authRouter}