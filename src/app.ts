// Express Provide Request and Response
import express, { Request, Response, NextFunction } from "express";
import logger from "./config/logger";
import createHttpError, { HttpError } from "http-errors";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Auth Service",
        status: "Ok",
    });
});

app.get("/error", async (req, res, next) => {
    const err = createHttpError(401, "you are not allowed to access this page");
    return next(err);
});

// Global Middleware -> which automaticcaly execute whenever we hit any api endpoint

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        errors: [
            {
                type: error.name,
                msg: error.message,
                path: "",
                location: "",
                statusCode: statusCode,
            },
        ],
    });
});

export default app;
