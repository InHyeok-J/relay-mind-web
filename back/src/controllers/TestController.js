import express from 'express';
import * as TestService from '../services/TestService';

const router = express.Router();

router.get('/', TestService.test);

export default router;
