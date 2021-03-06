import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as RedisStore from 'connect-redis';
import 'reflect-metadata';
import { errorHandler } from './middleware/errorHandler';
import env from './configs';
import routes from './routes';
import { createConnection } from 'typeorm';
import ConnectionOptions from './database/ormconfig';
import passportConfig from './configs/passport';
import client from './database/redisClient';
import './utils/customReponse';
import { promisify } from 'util';

const app = express();
const redisSession = RedisStore(session);

passportConfig();

createConnection(ConnectionOptions)
    .then(async (connection) => {
        console.log('success');
    })
    .catch((error) => console.error(error));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(env.COOKIE_SECRET));
export const sessionMiddleware = session({
    secret: env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: new redisSession({
        client: client,
    }),
});
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

//All router
app.use('/', routes);

//Error Handler
app.use(errorHandler);

app.get('/', (req, res, next) => {
    res.send('서버 실행중입니다');
});

export default app;
