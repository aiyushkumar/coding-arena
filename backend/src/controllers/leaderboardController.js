import { User } from '../models/User.js';

/**
 * @desc    Get global student leaderboard
 * @route   GET /api/leaderboard
 */
export const getGlobalLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit || '50', 10);
    const page = parseInt(req.query.page || '1', 10);
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      User.find()
        .select('name profile points rating createdAt')
        .sort({ points: -1, rating: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments()
    ]);

    const rankedUsers = users.map((user, index) => ({
      rank: skip + index + 1,
      id: user._id,
      name: user.name,
      avatar: user.profile.avatar,
      bio: user.profile.bio,
      points: user.points,
      rating: user.rating,
      totalSolved: user.profile.totalSolved,
      easySolved: user.profile.easySolved,
      mediumSolved: user.profile.mediumSolved,
      hardSolved: user.profile.hardSolved
    }));

    res.json({
      success: true,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      leaderboard: rankedUsers
    });
  } catch (error) {
    next(error);
  }
};
