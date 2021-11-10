import * as express from 'express';
import { signUp } from '../controllers/user';

const router = express.Router();

router.post('/signup', signUp);

export default router;
