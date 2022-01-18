import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Request Error");

    Object.setPrototypeOf(this, RequestError.prototype)
  }

  serializeError() {
    return this.errors.map(error=>{
        return {message:error.msg, feild:error.param}
    })
  }
}
