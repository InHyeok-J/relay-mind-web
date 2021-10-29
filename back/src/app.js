import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import env from './configs';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as ErrorHandler from './middlewares/ErrorHandler';
import TestController from './controllers/TestController';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
    session({
        secret: env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.get('/', (req, res, next) => {
    res.send('gd');
});

app.use('/test', TestController);

//404Router handler
app.use(ErrorHandler.routerHanlder);

//Error Handler
app.use(ErrorHandler.logHandler);
app.use(ErrorHandler.errorHandler);

app.listen(env.PORT, () => {
    console.log(env.PORT + '서버 시작');
});
