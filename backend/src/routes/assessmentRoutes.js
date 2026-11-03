import express from 'express';
import {
  getAssessmentQuestions,
  submitAssessment,
  getSkillProfile
} from '../controllers/assessmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/questions', getAssessmentQuestions);
router.post('/submit', protect, submitAssessment);
router.get('/profile', protect, getSkillProfile);

export default router;
