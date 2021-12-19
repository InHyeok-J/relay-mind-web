import { isNotLoggedIn, isLoggedIn } from '../middleware/authHandler';
import { Router } from 'express';
import {
    createGame,
    getGame,
    getGameList,
    checkGamePassword,
    startGame,
    keywordUpdate,
    drawKeyword,
} from '../controllers/game';

const router = Router();

router.post('/', isLoggedIn, createGame);
router.get('/list', isLoggedIn, getGameList);
router.get('/:id', isLoggedIn, getGame);
router.post('/check', isLoggedIn, checkGamePassword);
router.post('/start', isLoggedIn, startGame);
router.post('/keyword', keywordUpdate);
router.post('/keyword/draw', drawKeyword);
export default router;
