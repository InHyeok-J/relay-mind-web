import { User } from './../../entity/User';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';

export const getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        if (req.user) {
            const user = await userRepository.findOne({
                where: { id: req.user.id },
            });
            return res.customSuccess(200, '유저정보조회 성공', {
                ...user,
                password: null,
            });
        } else {
            return res.customFail(400, '유저정보확인 실패');
        }
    }
);
