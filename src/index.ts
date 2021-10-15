import express from "express";
import { connect } from "mongoose";
import { authRouter } from "./router/auth-router";

const app = express();
const port = 3000;

app.use(express.json());

app.use(authRouter);

connect("mongodb://127.0.0.1:27017/auth-users")
  .then(() => {
    app.listen(port, () => {
      console.log("Auth service is starts in port ", port);
    });
  })
  .catch(() => console.log("unable to connect to the db"));
