import express from 'express';
import {
  getContests,
  getContestById,
  registerForContest,
  getContestLeaderboard
} from '../controllers/contestController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getContests);
router.get('/:id', optionalAuth, getContestById);
router.post('/:id/register', protect, registerForContest);
router.get('/:id/leaderboard', getContestLeaderboard);

export default router;
