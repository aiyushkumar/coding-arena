import { getPersonalizedRecommendations } from '../services/recommendationService.js';

/**
 * @desc    Get dynamic problem recommendations based on user's weakest topics
 * @route   GET /api/recommendations
 */
export const getRecommendations = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit || '6', 10);
    const userId = req.user.id;

    const data = await getPersonalizedRecommendations(userId, limit);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};
