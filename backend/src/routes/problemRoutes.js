import express from 'express';
import {
  getProblems,
  getProblemBySlug,
  createProblem
} from '../controllers/problemController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getProblems);
router.get('/:slug', optionalAuth, getProblemBySlug);
router.post('/', protect, authorize('admin'), createProblem);

export default router;
