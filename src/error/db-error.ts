import { CustomError } from "./custom-error";

export class DatabaseConnection extends CustomError{
    statusCode = 500

    constructor(){
        super('Database Error')
        Object.setPrototypeOf(this, DatabaseConnection.prototype)
    }

    serializeError(){
        return [{message:"Database Connection Error"}]
    }
}