import { connect } from "mongoose";
import { app } from "./app";

const port = 8000;

connect("mongodb://127.0.0.1:27017/dummy-sample")
  .then(() => {
    app.listen(port, () => {
      console.log("Auth service is starts in port ", port);
    });
  })
  .catch(() => console.log("unable to connect to the db"));
