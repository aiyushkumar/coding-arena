import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { SkillProfile } from '../models/SkillProfile.js';
import { User } from '../models/User.js';

/**
 * @desc    Get all diagnostic assessment questions
 * @route   GET /api/assessment/questions
 */
export const getAssessmentQuestions = async (req, res, next) => {
  try {
    const questions = await AssessmentQuestion.find().select('-correctOptionIndex -explanation');
    res.json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit assessment answers, compute topic proficiency & update SkillProfile
 * @route   POST /api/assessment/submit
 */
export const submitAssessment = async (req, res, next) => {
  try {
    const { answers } = req.body; // Map: { [questionId]: selectedIndex }
    const userId = req.user.id;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers payload format.'
      });
    }

    const questionIds = Object.keys(answers);
    const questions = await AssessmentQuestion.find({ _id: { $in: questionIds } });

    // Track per-topic correct counts and total questions
    const topicStats = {};
    const detailedFeedback = [];

    for (const q of questions) {
      const topic = q.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = { correct: 0, total: 0, weight: 0 };
      }
      topicStats[topic].total += 1;

      const userChoice = answers[q._id.toString()];
      const isCorrect = userChoice === q.correctOptionIndex;

      if (isCorrect) {
        topicStats[topic].correct += 1;
      }

      detailedFeedback.push({
        questionId: q._id,
        topic: q.topic,
        isCorrect,
        correctOptionIndex: q.correctOptionIndex,
        explanation: q.explanation
      });
    }

    // Load or create SkillProfile
    let skillProfile = await SkillProfile.findOne({ user: userId });
    if (!skillProfile) {
      skillProfile = await SkillProfile.create({ user: userId });
    }

    // Baseline topic scores
    const currentScores = skillProfile.topicScores
      ? (skillProfile.topicScores.toObject ? skillProfile.topicScores.toObject() : skillProfile.topicScores)
      : {
          'Arrays': 50,
          'Strings': 50,
          'Dynamic Programming': 30,
          'Graphs': 30,
          'Trees': 40,
          'Searching & Sorting': 50,
          'Math & Logic': 45,
          'Greedy': 40
        };

    const newScores = { ...currentScores };

    // Calculate score for each topic:
    // Base formula: calibrated proficiency between 20 (struggling) and 95 (strong)
    for (const [topic, stats] of Object.entries(topicStats)) {
      const accuracy = stats.correct / stats.total;
      // Map accuracy to score scale: 0% -> 25, 50% -> 55, 100% -> 90
      const calculatedScore = Math.round(25 + accuracy * 65);
      newScores[topic] = Math.max(15, Math.min(100, calculatedScore));
    }

    skillProfile.topicScores = newScores;
    skillProfile.lastAssessedAt = new Date();
    if (skillProfile.updateStrengthsAndWeaknesses) {
      skillProfile.updateStrengthsAndWeaknesses();
    }

    // Add entry to history
    if (!Array.isArray(skillProfile.assessmentHistory)) {
      skillProfile.assessmentHistory = [];
    }
    skillProfile.assessmentHistory.push({
      date: new Date(),
      scores: newScores,
      overallProficiency: skillProfile.overallProficiency
    });

    await skillProfile.save();

    // Mark user as assessment completed
    await User.findByIdAndUpdate(userId, { hasCompletedAssessment: true });

    res.json({
      success: true,
      message: 'Skill assessment evaluated successfully!',
      skillProfile: {
        topicScores: skillProfile.topicScores,
        overallProficiency: skillProfile.overallProficiency,
        strengths: skillProfile.strengths,
        weaknesses: skillProfile.weaknesses,
        recommendedFocus: skillProfile.recommendedFocus,
        lastAssessedAt: skillProfile.lastAssessedAt
      },
      detailedFeedback
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's current skill profile
 * @route   GET /api/assessment/profile
 */
export const getSkillProfile = async (req, res, next) => {
  try {
    let skillProfile = await SkillProfile.findOne({ user: req.user.id });
    if (!skillProfile) {
      skillProfile = await SkillProfile.create({
        user: req.user.id
      });
      skillProfile.updateStrengthsAndWeaknesses();
      await skillProfile.save();
    }

    res.json({
      success: true,
      skillProfile
    });
  } catch (error) {
    next(error);
  }
};
