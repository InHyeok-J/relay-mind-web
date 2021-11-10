import { User } from './entity/User';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import 'reflect-metadata';
import {
    routerHandler,
    logHandler,
    errorHandler,
} from './middleware/errorHandler';
import env from './configs';
import userRouter from './routes/user';
import { createConnection } from 'typeorm';
import ConnectionOptions from './database/ormconfig';

const app = express();

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
app.use(
    session({
        secret: env.COOKIE_SECRET!,
        resave: false,
        saveUninitialized: false,
    })
);
app.get('/', (req, res, next) => {
    res.send('hello');
});

app.use('/api/user', userRouter);

//404 Router Handler
app.use(routerHandler);

//Error Log and Handler
app.use(logHandler);
app.use(errorHandler);

app.get('/', (req, res, next) => {
    res.send('서버 실행중입니다');
});

export default app;
