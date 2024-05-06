import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
    message: string;
    statusCode: number;
    constructor (message: string, statusCode: number){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
};

export const errorMiddleware = (error: ErrorHandler,  _: Request, res: Response, __: NextFunction) => {
    const msg = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode)
    .json({message: msg});
}
