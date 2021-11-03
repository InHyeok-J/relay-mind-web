import { Request, Response, NextFunction } from 'express';

export const logHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('ErrorLog' + '[' + new Date() + ']\n' + err.stack);
    next(err);
};

export const routerHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error: any = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    function jsonFriendlyErrorReplacer(key: any, value: any) {
        if (value instanceof Error) {
            return {
                // Pull all enumerable properties, supporting properties on custom Errors
                ...value,
                // Explicitly pull Error's non-enumerable properties
                name: value.name,
                message: value.message,
            };
        }

        return value;
    }
    err.status = err.status || 500;
    res.status(err.status);
    res.type('json').send(JSON.stringify(err, jsonFriendlyErrorReplacer));
};
