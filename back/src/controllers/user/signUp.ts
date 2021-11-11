import { User } from '../../entity/User';
import { getRepository } from 'typeorm';
import catchAsync from '../../utils/catchAsync';

export const signUp = catchAsync(async (req, res, next) => {
    const { nickname, userId, password } = req.body;
    const userRepository = getRepository(User);

    const existNickname = await userRepository.findOne({ where: { nickname } });

    if (existNickname)
        return res.customFail(400, '이미 사용중인 닉네임입니다.');

    const existUserId = await userRepository.findOne({ where: { userId } });
    if (existUserId) return res.customFail(400, '이미 사용중인 아이디입니다.');

    const newUser = new User();
    newUser.nickname = nickname;
    newUser.userId = userId;
    newUser.password = password;
    newUser.hashPassword();

    try {
        await userRepository.save(newUser);
    } catch (err) {
        return res.customFail(500, 'database Error');
    }
    return res.customSuccess(201, '회원가입 성공');
});
