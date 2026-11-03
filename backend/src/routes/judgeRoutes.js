import express from 'express';
import {
  runCode,
  submitCode,
  getSubmissionsForProblem
} from '../controllers/judgeController.js';
import { protect } from '../middleware/auth.js';
import { judgeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/run', judgeLimiter, runCode);
router.post('/submit', protect, judgeLimiter, submitCode);
router.get('/submissions/:problemId', protect, getSubmissionsForProblem);

export default router;
