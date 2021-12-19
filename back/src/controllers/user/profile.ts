import { Player } from './../../entity/Player';
import { User } from './../../entity/User';
import { Game } from './../../entity/Game';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

export const getProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        const gameRepository = getRepository(Game);
        const playerRepository = getRepository(Player);

        const findUser = await userRepository.findOne({
            where: { id: req.user.id },
        });
        console.log(findUser);

        const gamelist = await playerRepository.find({
            where: { player: findUser },
            relations: ['gameRoom', 'drawList'],
        });

        return res.customSuccess(200, '조회성공', gamelist);
    }
);
