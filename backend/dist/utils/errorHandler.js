export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
;
export const errorMiddleware = (error, _, res, __) => {
    const msg = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode)
        .json({ message: msg });
};
