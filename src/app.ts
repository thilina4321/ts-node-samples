import "dotenv/config";
import express from "express";
import "express-async-errors";

import { authRouter } from "./router/auth-router";
import { NotFoundError } from "@ticketsz/common";
import { ErrorHandling } from "./middleware/error-handling-middleware";
import { currentUser } from "./middleware/current-user";
const app = express();

app.use(express.json()); 

app.use(currentUser);
app.use(authRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(ErrorHandling);

export { app };
