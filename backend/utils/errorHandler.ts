import { Request, Response } from "express";

export class ErrorHandler extends Error {
    message: string;
    statusCode: number;
    constructor (message: string, statusCode: number){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
};

export const errorMiddleware = (error: ErrorHandler,  req: Request, res: Response) => {
    const msg = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode)
    .json({message: msg});
}
