import { getString, setString } from './../../utils/redisAsync';
import { Player } from './../../entity/Player';
import { User } from './../../entity/User';
import { Game, gameStatus } from './../../entity/Game';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Draw } from './../../entity/Draw';

export const keywordUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { keyword, value, phase, roomId, playerId } = req.body;

    const gameRepository = getRepository(Game);
    const useRepository = getRepository(User);
    const playerRepository = getRepository(Player);
    const drawRepository = getRepository(Draw);
    const socket = req.app.get('io');

    const findGame = await gameRepository.findOne({
        where: { id: roomId },
    });
    const userList = await playerRepository.find({
        where: { gameRoom: roomId },
        relations: ['player', 'drawList'],
    });

    //phase == 1

    //유저 아이디 별 키워드 셋팅
    await Promise.all(
        userList.map(async (gameplayer) => {
            if (gameplayer.player.id === req.user.id) {
                const findPlayer = await playerRepository.findOne({
                    where: { id: gameplayer.id },
                });
                findPlayer.keyword = keyword;
                await playerRepository.save(findPlayer);
            }
        })
    );

    //모든 유저 전송 확인용 캐시에 카운트 저장
    const phaseCount = await getString(`game-${roomId}-phase-${phase}`);
    let count = parseInt(phaseCount);
    await setString(`game-${roomId}-phase-${phase}`, count - 1);

    // 카운트가 1일 때 다음 페이즈 전송
    if (count === 1) {
        const List = await playerRepository.find({
            where: { gameRoom: roomId },
            relations: ['player', 'drawList'],
        });
        findGame.phase = 2;
        let userCount = 0;
        const nextPhase = List.map((user) => {
            if (userCount + phase > 2) userCount = -1;
            userCount++;
            return {
                ...user.player,
                keyword: List[userCount].keyword,
            };
        });
        console.log('다음 스탭 실행', nextPhase);
        await setString(`game-${roomId}-phase-${phase + 1}`, List.length);
        await gameRepository.save(findGame);
        socket.to(`room-${roomId}`).emit('nextPhase', { nextPhase });
        return res.customSuccess(200, 'success');
    }
    console.log('delay check');
    return res.customSuccess(200, 'delay', count);
};
