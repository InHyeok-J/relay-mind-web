import { isNotLoggedIn, isLoggedIn } from './../middleware/authHandler';
import { Router } from 'express';
import { signUp, login, logout, getUser } from '../controllers/user';

const router = Router();

router.get('/', getUser);
router.post('/signup', isNotLoggedIn, signUp);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

export default router;
