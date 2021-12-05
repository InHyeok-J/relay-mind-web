import { Router } from 'express';
import userRouter from './user';
import gameRouter from './game';
import NotFoundRouter from './404';

const router = Router();

//user
router.use('/api/user', userRouter);
//room
router.use('/api/game', gameRouter);
//404 Router Handler
router.use(NotFoundRouter);

export default router;
