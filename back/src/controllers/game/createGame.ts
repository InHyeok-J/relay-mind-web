import { Player } from './../../entity/Player';
import { User } from './../../entity/User';
import { CustomError } from './../../utils/customError';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { Game, gameStatus } from '../../entity/Game';
import { validate } from 'class-validator';

export const createGame = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const gameRepository = getRepository(Game);
        const useRepository = getRepository(User);
        const playerRepository = getRepository(Player);
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
                400,
                'Validate',
                'Validation Failed',
                errors
            );
            return next(customError);
        }

        try {
            const user = await useRepository.findOne({
                where: { id: req.user.id },
            });
            //나중에 트랜잭션 추가
            const createdGame = await gameRepository.save(game);

            const newPlayer = new Player();
            newPlayer.isOwner = true;
            newPlayer.gameRoom = createdGame;
            newPlayer.player = user;

            playerRepository.save(newPlayer);
            return res.customSuccess(201, '게임 생성 성공');
        } catch (err) {
            const customError = new CustomError(
                500,
                'Unknown',
                'databaseError',
                err
            );
            return next(customError);
        }
    }
);
