import { isNotLoggedIn, isLoggedIn } from '../middleware/authHandler';
import { Router } from 'express';
import { createGame, getGame, getGameList } from '../controllers/game';

const router = Router();

router.post('/', isLoggedIn, createGame);
router.get('/list', isLoggedIn, getGameList);
router.get('/:id', isLoggedIn, getGame);

export default router;
