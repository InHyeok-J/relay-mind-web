import { CustomError } from './../../utils/customError';
import { Player } from './../../entity/Player';
import { User } from './../../entity/User';
import { Game, gameStatus } from './../../entity/Game';
import { getRepository } from 'typeorm';
import { HashGetALLAsync, setString } from './../../utils/redisAsync';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

export const startGame = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { roomId } = req.body;
        const gameRepository = getRepository(Game);
        const useRepository = getRepository(User);
        const playerRepository = getRepository(Player);
        const socket = req.app.get('io');
        const list = await HashGetALLAsync(`room-${roomId}`);
        const keyArray = Object.keys(list);
        console.log(list);

        //3인 미만 or 0명이면 시작 X
        if (keyArray.length < 3 || list === null) {
            return res.customFail(400, '3인 미만은 시작하실 수 없습니다.');
        }

        //3인 이상일때 시작
        const findGame = await gameRepository.findOne({
            where: { id: roomId },
            relations: ['gamePlayer', 'gamePlayer.player'],
        });
        console.log(findGame);
        try {
            await Promise.all(
                keyArray.map(async (key) => {
                    if (
                        !(
                            parseInt(list[key]) ===
                            findGame.gamePlayer[0].player.id
                        )
                    ) {
                        //방장 제외

                        const findUser = await useRepository.findOne({
                            where: { id: parseInt(list[key]) },
                        });
                        const newPlayer = new Player();
                        newPlayer.isOwner = false;
                        newPlayer.gameRoom = findGame;
                        newPlayer.player = findUser;
                        playerRepository.save(newPlayer);
                    }
                })
            );
            findGame.status = gameStatus.gaming;
            findGame.updatedAt = new Date();
            await gameRepository.save(findGame);
        } catch (err) {
            const customError = new CustomError(
                500,
                'Unknown',
                'databaseError',
                err
            );
            return next(customError);
        }

        //카운트 용 레디스에 저장
        await setString(
            `game-${roomId}-phase-${findGame.phase}`,
            keyArray.length
        );
        socket.to(`room-${roomId}`).emit('gameStart', { status: 'start' });

        return res.customSuccess(200, '시작');
    }
);
