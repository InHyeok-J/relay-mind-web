import { CustomError } from './../utils/customError';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('ErrorLog' + '[' + new Date() + ']\n' + err.stack);
    return res.status(err.HttpStatusCode).send(err.JSON);
};
