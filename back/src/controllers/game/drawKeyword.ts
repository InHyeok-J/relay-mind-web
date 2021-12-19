import { getString, setString } from './../../utils/redisAsync';
import { Draw } from './../../entity/Draw';
import { Player } from './../../entity/Player';
import { User } from './../../entity/User';
import { Game, gameStatus } from './../../entity/Game';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
export const drawKeyword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { value, phase, roomId, playerId } = req.body;
        const gameRepository = getRepository(Game);
        const useRepository = getRepository(User);
        const playerRepository = getRepository(Player);
        const drawRepository = getRepository(Draw);
        const socket = req.app.get('io');

        const findGame = await gameRepository.findOne({
            where: { id: parseInt(roomId) },
        });
        const findUser = await useRepository.findOne({
            where: { id: req.user.id },
        });
        const newDraw = new Draw();
        const findPlayer = await playerRepository.findOne({
            where: { id: playerId },
        });

        newDraw.drawValue = value.toString();
        newDraw.phase = phase;
        newDraw.initKeyword = findPlayer;
        newDraw.drwaingUser = findUser;
        await drawRepository.save(newDraw);

        const phaseCount = await getString(`game-${roomId}-phase-${phase}`);
        let count = parseInt(phaseCount);
        console.log(count);

        await setString(`game-${roomId}-phase-${phase}`, count - 1);
        if (count === 1) {
            console.log('gameEnd');
            findGame.status = gameStatus.close;
            await gameRepository.save(findGame);
            socket.to(`room-${roomId}`).emit('end', { status: 'Close' });
            return res.customSuccess(200, '게임 종료');
        } else {
            return res.customSuccess(200, 'delay');
        }
    }
);
