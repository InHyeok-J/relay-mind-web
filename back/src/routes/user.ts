import * as express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('hi');
});

export default router;
