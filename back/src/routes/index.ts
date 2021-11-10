import { routerHandler } from './../middleware/errorHandler';
import { Router } from 'express';
import userRouter from './user';

const router = Router();

//user
router.use('/api/user', userRouter);

//404 Router Handler
router.use(routerHandler);

export default router;
