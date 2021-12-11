import { CustomError } from './../../utils/customError';
import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import catchAsync from '../../utils/catchAsync';
import { validate } from 'class-validator';

export const signUp = catchAsync(async (req, res, next) => {
    const { nickname, userId, password } = req.body;
    const userRepository = getRepository(User);

    const existNickname = await userRepository.findOne({ where: { nickname } });

    if (existNickname) {
        const customError = new CustomError(
            400,
            'Exist',
            '이미 사용중인 닉네임입니다',
            null
        );
        return next(customError);
    }
    const existUserId = await userRepository.findOne({ where: { userId } });
    if (existUserId) {
        const customError = new CustomError(
            400,
            'Exist',
            '이미 사용중인 아이디입니다.',
            null
        );
        return next(customError);
    }
    const newUser = new User();
    newUser.nickname = nickname;
    newUser.userId = userId;
    newUser.password = password;
    newUser.hashPassword();

    const errors = await validate(newUser);
    if (errors.length > 0) {
        const customError = new CustomError(
            400,
            'Validate',
            'Validation Failed',
            errors
        );
        return next(customError);
    }

    try {
        await userRepository.save(newUser);
        return res.customSuccess(201, '회원가입 성공');
    } catch (err) {
        const customError = new CustomError(
            500,
            'Unknown',
            'databaseError',
            err
        );
        return next(customError);
    }
});
