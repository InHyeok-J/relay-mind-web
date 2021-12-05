import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
    return res.customFail(404, `${req.method} ${req.url} 404 Not Found`);
});

export default router;
