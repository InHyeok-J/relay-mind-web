import { Player } from './../../entity/Player';
import { CustomError } from './../../utils/customError';
import { Game } from './../../entity/Game';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

export const getGame = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const gameRepository = getRepository(Game);

        try {
            const game = await gameRepository.findOne({
                where: { id: req.params.id },
                relations: ['gamePlayer', 'gamePlayer.player'],
            });
            console.log(game);
            if (!game) {
                const customError = new CustomError(
                    400,
                    'Not Exist',
                    '게임이 존재하지 않습니다',
                    null
                );
                return next(customError);
            }
            delete game['password'];
            const playerFilter = game.gamePlayer.map((player) => {
                player.player.password = null;
                return player;
            });
            return res.customSuccess(200, '게임조회성공', {
                ...game,
                gamePlayer: playerFilter,
            });
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
