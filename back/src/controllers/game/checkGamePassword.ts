import { CustomError } from './../../utils/customError';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import { Game } from '../../entity/Game';

export const checkGamePassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { gameId, password } = req.body;
        const gameRepository = getRepository(Game);

        const findGame: Game = await gameRepository.findOne({
            where: { id: gameId },
        });
        if (!findGame) {
            const customError = new CustomError(
                400,
                'Not Exist',
                '게임이 존재하지 않습니다',
                null
            );
            return next(customError);
        }

        const checkPassword = findGame.checkPasswordMatch(password);
        if (checkPassword) {
            return res.customSuccess(200, '일치 성공');
        } else {
            return res.customFail(400, '패스워드 불일치');
        }
    }
);
