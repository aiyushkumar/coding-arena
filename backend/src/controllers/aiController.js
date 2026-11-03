import { Problem } from '../models/Problem.js';
import { SkillProfile } from '../models/SkillProfile.js';
import { getAIHintGuide } from '../services/aiService.js';

/**
 * @desc    Get AI-powered contextual, non-spoiler hints for failing or in-progress code
 * @route   POST /api/ai/hint
 */
export const getHint = async (req, res, next) => {
  try {
    const {
      problemId,
      sourceCode,
      language = 'javascript',
      submissionStatus = 'In Progress',
      errorLog = '',
      userQuestion = ''
    } = req.body;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID is required.'
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.'
      });
    }

    const skillProfile = req.user
      ? await SkillProfile.findOne({ user: req.user.id })
      : null;

    const hintReport = await getAIHintGuide({
      problem,
      userCode: sourceCode || '',
      language,
      submissionStatus,
      errorLog,
      userQuestion,
      skillProfile
    });

    res.json({
      success: true,
      hintReport
    });
  } catch (error) {
    next(error);
  }
};
