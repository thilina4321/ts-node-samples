import express from "express";
import { signIn, signup, currentUser } from "../controller";
import { validateRequest } from "../middleware";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/users/signup",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Minimum should be 5"),
  ],
  validateRequest,
  signup
);

router.post(
  "/users/signin",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Please provide the password"),
  ],
  validateRequest,
  signIn
);

router.get("/users/current-user", currentUser);

export { router as authRouter };
