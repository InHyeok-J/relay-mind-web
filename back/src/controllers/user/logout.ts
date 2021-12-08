import { CustomError } from './../../utils/customError';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';

export const logout = catchAsync(
    (req: Request, res: Response, next: NextFunction) => {
        req.logOut();
        req.session.destroy((err) => {
            if (err) {
                const customError = new CustomError(
                    500,
                    'Session',
                    'sessionError',
                    err
                );
                return next(customError);
            } else {
                res.clearCookie('connect.sid');
                res.customSuccess(200, '로그아웃 성공');
            }
        });
    }
);
