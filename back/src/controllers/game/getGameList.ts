import { CustomError } from './../../utils/customError';
import { Game } from './../../entity/Game';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

export const getGameList = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const gameRepository = getRepository(Game);

        try {
            const gameList = await gameRepository.find({
                relations: ['gamePlayer', 'gamePlayer.player'],
                where: {
                    status: 'Open',
                },
                order: {
                    createdAt: 'DESC',
                },
            });
            const filter = gameList.map((game) => {
                delete game['password'];
                game.gamePlayer.map((v) => {
                    v.player.password = null;
                    return v;
                });
                return game;
            });
            return res.customSuccess(200, '게임방리스트 조회 성공', filter);
        } catch (err) {
            const customError = new CustomError(
                500,
                'Unknown',
                'unknownError',
                null
            );
            return next(customError);
        }
    }
);
