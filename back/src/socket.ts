import { Server } from 'socket.io';
import * as passport from 'passport';
import { sessionMiddleware } from './index';
import passportConfig from './configs/passport';

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

    newNameSpace.on('connection', (socket) => {
        console.log(socket.nsp.name + '연결 성공');
        console.log(socket.request.user);

        socket.emit('join', 'Hi');

        socket.on('disconnect', () => {
            console.log('연결 종료');
        });
    });

    // passportConfig();
};
