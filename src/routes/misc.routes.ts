import { Router } from 'express';
import { getCategories, getStats } from '../controllers/misc.controller';

const router = Router();

router.get('/categories', getCategories);
router.get('/stats', getStats);

export default router;
