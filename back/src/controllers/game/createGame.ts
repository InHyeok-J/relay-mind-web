import { CustomError } from './../../utils/customError';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { Game, gameStatus } from '../../entity/Game';
import { validate } from 'class-validator';

export const createGame = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const gameRepository = getRepository(Game);
        const { title, isSecret, password } = req.body;
        const game = new Game();
        game.title = title;
        game.isSecret = isSecret;
        game.status = gameStatus.open;
        if (isSecret) {
            game.password = password;
            game.hashPassword();
        }

        const errors = await validate(game);
        if (errors.length > 0) {
            const customError = new CustomError(
                401,
                'validate',
                'Validation Failed',
                errors
            );
            return next(customError);
        }

        try {
            await gameRepository.save(game);
            return res.customSuccess(201, '게임 생성 성공');
        } catch (err) {
            const customError = new CustomError(
                500,
                'unknown',
                'databaseError',
                err
            );
            return next(customError);
        }
    }
);
