import { isNotLoggedIn, isLoggedIn } from '../middleware/authHandler';
import { Router } from 'express';
import { createGame } from '../controllers/game';

const router = Router();

router.post('/', isLoggedIn, createGame);

export default router;
