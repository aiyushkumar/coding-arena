import express from 'express';
import { getHint } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/hint', protect, aiLimiter, getHint);

export default router;
