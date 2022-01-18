import { CustomError } from "./custom-error";

export class BadRequest extends CustomError{
    statusCode = 400

    constructor(public message:string){
        super(message)
        Object.setPrototypeOf(this, BadRequest.prototype)
    }

    serializeError(){
        return [{message:this.message}]
    }
}