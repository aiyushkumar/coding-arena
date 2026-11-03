import { Contest } from '../models/Contest.js';
import { User } from '../models/User.js';

/**
 * @desc    Get all contests (upcoming, active, ended)
 * @route   GET /api/contests
 */
export const getContests = async (req, res, next) => {
  try {
    const contests = await Contest.find()
      .populate('problems.problem', 'title slug difficulty points')
      .sort({ startTime: -1 });

    const formattedContests = contests.map((c) => {
      const obj = c.toObject();
      const now = new Date();
      let status = 'upcoming';
      if (now >= c.startTime && now <= c.endTime) status = 'active';
      else if (now > c.endTime) status = 'ended';

      const isRegistered = req.user
        ? c.registeredUsers.some(
            (r) => r.user.toString() === req.user.id.toString()
          )
        : false;

      return {
        ...obj,
        status,
        registeredCount: c.registeredUsers.length,
        isRegistered,
        problemCount: c.problems.length
      };
    });

    res.json({
      success: true,
      count: formattedContests.length,
      contests: formattedContests
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get contest details by ID
 * @route   GET /api/contests/:id
 */
export const getContestById = async (req, res, next) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate('problems.problem', 'title slug difficulty topicTags points acceptanceRate')
      .populate('scoreboard.user', 'name profile');

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: 'Contest not found.'
      });
    }

    const isRegistered = req.user
      ? contest.registeredUsers.some(
          (r) => r.user.toString() === req.user.id.toString()
        )
      : false;

    res.json({
      success: true,
      contest: {
        ...contest.toObject(),
        isRegistered
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Register logged-in user for a contest
 * @route   POST /api/contests/:id/register
 */
export const registerForContest = async (req, res, next) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) {
      return res.status(404).json({
        success: false,
        message: 'Contest not found.'
      });
    }

    const alreadyRegistered = contest.registeredUsers.some(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this contest.'
      });
    }

    contest.registeredUsers.push({
      user: req.user.id,
      registeredAt: new Date()
    });

    // Also initialize entry in scoreboard
    const user = await User.findById(req.user.id);
    const existingEntry = contest.scoreboard.find(
      (s) => s.user.toString() === req.user.id.toString()
    );

    if (!existingEntry) {
      contest.scoreboard.push({
        user: req.user.id,
        username: user.name,
        avatar: user.profile.avatar,
        score: 0,
        penaltyTime: 0,
        rank: contest.scoreboard.length + 1,
        problemStats: []
      });
    }

    await contest.save();

    res.json({
      success: true,
      message: 'Successfully registered for the contest!',
      registeredCount: contest.registeredUsers.length
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get real-time leaderboard for a contest
 * @route   GET /api/contests/:id/leaderboard
 */
export const getContestLeaderboard = async (req, res, next) => {
  try {
    const contest = await Contest.findById(req.params.id).select('title scoreboard startTime endTime');
    if (!contest) {
      return res.status(404).json({
        success: false,
        message: 'Contest not found.'
      });
    }

    res.json({
      success: true,
      contestTitle: contest.title,
      scoreboard: contest.scoreboard
    });
  } catch (error) {
    next(error);
  }
};
