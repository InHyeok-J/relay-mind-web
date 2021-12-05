import { CustomError } from './../../utils/customError';
import catchAsync from '../../utils/catchAsync';
import * as passport from 'passport';

export const login = catchAsync(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            const customError = new CustomError(
                500,
                'session',
                'passportError',
                err
            );
            return next(customError);
        }
        if (!user) {
            const customError = new CustomError(
                401,
                'exits',
                info.message,
                err
            );
            return next(customError);
        }
        req.login(user, (err) => {
            if (err) {
                const customError = new CustomError(
                    500,
                    'session',
                    'passportError',
                    err
                );
                return next(customError);
            }
            return res.customSuccess(200, '로그인성공', {
                ...user,
                password: null,
            });
        });
    })(req, res, next);
});
