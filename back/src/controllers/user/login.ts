import catchAsync from '../../utils/catchAsync';
import * as passport from 'passport';

export const login = catchAsync(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.customFail(400, info.message);
        }
        req.login(user, (err) => {
            if (err) {
                next(err);
            }
            return res.customSuccess(200, '로그인성공', {
                ...user,
                password: null,
            });
        });
    })(req, res, next);
});
