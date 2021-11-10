import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.customFail(401, '로그인이 필요합니다.');
    }
};

export const isNotLoggedIn = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.customFail(401, '이미 로그인 된 유저입니다.');
    }
};
