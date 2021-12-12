import { isNotLoggedIn, isLoggedIn } from '../middleware/authHandler';
import { Router } from 'express';
import {
    createGame,
    getGame,
    getGameList,
    checkGamePassword,
} from '../controllers/game';

const router = Router();

router.post('/', isLoggedIn, createGame);
router.get('/list', isLoggedIn, getGameList);
router.get('/:id', isLoggedIn, getGame);
router.post('/check', isLoggedIn, checkGamePassword);
export default router;
