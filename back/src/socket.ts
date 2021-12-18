import {
    setUserList,
    getUserList,
    delUserList,
    HashGetOneAsync,
    HashGetALLAsync,
    HashSetAsync,
    HashDelAsync,
} from './utils/redisAsync';
import { Server } from 'socket.io';
import * as passport from 'passport';
import { sessionMiddleware } from './index';

export default (server, app) => {
    const SocketServer = new Server(server, {
        cors: {
            origin: true,
            credentials: true,
            methods: ['GET', 'POST'],
        },
        transports: ['websocket'],
    });

    const wrap = (middleware) => (socket, next) =>
        middleware(socket.request, {}, next);
    app.set('io', SocketServer);

    const newNameSpace = SocketServer.of('/relayMind');
    newNameSpace.use(wrap(sessionMiddleware));
    newNameSpace.use(wrap(passport.initialize()));
    newNameSpace.use(wrap(passport.session()));
    newNameSpace.use((socket, next) => {
        console.log('relay middleware');
        next();
    });
    newNameSpace.use((socket, next) => {
        if (!socket.request.user) {
            console.log('not login user');
            return;
        }
        next();
    });

    newNameSpace.on('connection', async (socket) => {
        try {
            console.log(socket.nsp.name + '연결 성공');
            const { nickname, id } = socket.request.user;
            await setUserList(nickname);
            const updateUserList = await getUserList('userList');
            const gameUserCountList = await HashGetALLAsync(
                'gameUserCountList'
            );
            newNameSpace.emit('gameList', { gameList: gameUserCountList });
            newNameSpace.emit('userList', { userList: updateUserList });

            socket.on('join', async (roomId) => {
                console.log(nickname, '이 방에 들어왔습니다.');

                const roomUser = await HashGetOneAsync(
                    `room-${roomId}`,
                    nickname
                );
                console.log(roomUser);
                if (!roomUser[0]) {
                    let roomCount = await HashGetOneAsync(
                        `gameUserCountList`,
                        roomId
                    );
                    console.log('룸카운터', roomCount);
                    let count = parseInt(roomCount.toString());
                    await HashSetAsync(`room-${roomId}`, nickname, id);

                    await HashSetAsync('gameUserCountList', roomId, ++count);
                    if (count > 6) {
                        socket.emit('socketError', { isFull: true });
                        return;
                    }
                }

                const roomUserList = await HashGetALLAsync(`room-${roomId}`);
                socket.join(`room-${roomId}`);
                newNameSpace
                    .to(`room-${roomId}`)
                    .emit('joinResponse', { roomUserList });
            });

            socket.on('leave', async (roomId) => {
                console.log(nickname, '이 방을 떠났습니다');
                await HashDelAsync(`room-${roomId}`, nickname);
                const roomCount = await HashGetOneAsync(
                    `gameUserCountList`,
                    roomId
                );
                let count = parseInt(roomCount.toString());
                if (count != 0) {
                    --count;
                }
                await HashSetAsync('gameUserCountList', roomId, count);

                const roomUserList = await HashGetALLAsync(`room-${roomId}`);
                socket.leave(`room-${roomId}`);
                newNameSpace
                    .to(`room-${roomId}`)
                    .emit('joinResponse', { roomUserList });
            });

            socket.on('disconnect', async () => {
                const findUserList = await getUserList('userList');

                if (findUserList.includes(nickname)) {
                    await delUserList(nickname);
                }

                const updateUserList = await getUserList('userList');
                newNameSpace.emit('userList', { userList: updateUserList });

                console.log('연결 종료', nickname);
            });
        } catch (err) {
            console.error(err);
            const errorMessage: SocketError = {
                message: '알수 없는 에러 발생',
            };
            socket.emit('socketError', errorMessage);
            return;
        }
    });

    // passportConfig();
};

type SocketError = {
    message: string;
    error?: any;
};
