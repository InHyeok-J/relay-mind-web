import { promisify } from 'util';
import { Server } from 'socket.io';
import * as passport from 'passport';
import { sessionMiddleware } from './index';
import client from './database/redisClient';

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
    const getAsync = promisify(client.smembers).bind(client);
    const setAsync = promisify((data, cb) =>
        client.sadd('userList', data, (err, ...results) => cb(err, results))
    ).bind(client);
    const delAsync = promisify((data, cb) =>
        client.srem('userList', data, (err, ...results) => cb(err, results))
    ).bind(client);

    newNameSpace.on('connection', async (socket) => {
        try {
            console.log(socket.nsp.name + '연결 성공');

            // const findUserList = await getAsync('userList');
            await setAsync(socket.request.user.nickname);
            const updateUserList = await getAsync('userList');

            newNameSpace.emit('userList', { userList: updateUserList });

            socket.on('disconnect', async () => {
                const findUserList = await getAsync('userList');
                if (findUserList.includes(socket.request.user.nickname)) {
                    await delAsync(socket.request.user.nickname);
                }

                const updateUserList = await getAsync('userList');
                newNameSpace.emit('userList', { userList: updateUserList });

                console.log('연결 종료', socket.request.user.nickname);
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
