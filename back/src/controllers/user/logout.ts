import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';

export const logout = catchAsync(
    (req: Request, res: Response, next: NextFunction) => {
        req.logOut();
        req.session.destroy((err) => {
            if (err) {
                next(err);
            } else {
                res.clearCookie('connect.sid');
                res.customSuccess(200, '로그아웃 성공');
            }
        });
    }
);
