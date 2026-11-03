import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';
import { User } from '../models/User.js';
import { SkillProfile } from '../models/SkillProfile.js';
import { Contest } from '../models/Contest.js';
import { executeSubmission } from '../services/judgeService.js';

/**
 * @desc    Run code against sample test cases or custom input (without recording official submission)
 * @route   POST /api/judge/run
 */
export const runCode = async (req, res, next) => {
  try {
    const { problemId, sourceCode, language = 'javascript', customInput } = req.body;

    if (!problemId || !sourceCode) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID and source code are required.'
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.'
      });
    }

    let testCasesToRun = [];

    if (customInput !== undefined && customInput !== null && customInput.trim() !== '') {
      testCasesToRun = [
        {
          input: customInput,
          expectedOutput: '', // Custom input has no known expected output
          isSample: true
        }
      ];
    } else {
      // Use sample test cases
      testCasesToRun = problem.sampleTestCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        explanation: tc.explanation,
        isSample: true
      }));
    }

    const runResult = await executeSubmission({
      sourceCode,
      language,
      testCases: testCasesToRun
    });

    res.json({
      success: true,
      result: runResult
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit code for official evaluation against full (hidden) test suite
 * @route   POST /api/judge/submit
 */
export const submitCode = async (req, res, next) => {
  try {
    const { problemId, sourceCode, language = 'javascript', contestId } = req.body;
    const userId = req.user.id;

    if (!problemId || !sourceCode) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID and source code are required.'
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found.'
      });
    }

    // Combine sample and hidden test cases for complete validation
    const fullTestSuite = [
      ...problem.sampleTestCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isSample: true
      })),
      ...problem.hiddenTestCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        isSample: false
      }))
    ];

    // Execute submission through the isolated judge service
    const executionResult = await executeSubmission({
      sourceCode,
      language,
      testCases: fullTestSuite
    });

    // Create the persistent submission record
    const submission = await Submission.create({
      user: userId,
      problem: problemId,
      contest: contestId || null,
      sourceCode,
      language,
      status: executionResult.status,
      statusCode: executionResult.statusCode,
      executionTime: executionResult.executionTime,
      memory: executionResult.memory,
      passedTestCases: executionResult.passedTestCases,
      totalTestCases: executionResult.totalTestCases,
      testResults: executionResult.testResults,
      errorLog: executionResult.errorLog
    });

    // Update Problem acceptance statistics
    problem.totalSubmissions += 1;
    if (executionResult.status === 'Accepted') {
      problem.totalAccepted += 1;
    }
    problem.acceptanceRate = Math.round(
      (problem.totalAccepted / problem.totalSubmissions) * 100
    );
    await problem.save();

    // If accepted, update user profile and skill ratings
    let pointsAwarded = 0;
    if (executionResult.status === 'Accepted') {
      // Check if user has already solved this problem previously
      const priorAccepted = await Submission.findOne({
        user: userId,
        problem: problemId,
        status: 'Accepted',
        _id: { $ne: submission._id }
      });

      if (!priorAccepted) {
        // First time solve: award points & increment solved counters
        const pointsMap = { Easy: 50, Medium: 100, Hard: 200 };
        pointsAwarded = pointsMap[problem.difficulty] || 75;

        const user = await User.findById(userId);
        user.points += pointsAwarded;
        user.profile.totalSolved += 1;

        if (problem.difficulty === 'Easy') user.profile.easySolved += 1;
        else if (problem.difficulty === 'Medium') user.profile.mediumSolved += 1;
        else if (problem.difficulty === 'Hard') user.profile.hardSolved += 1;

        await user.save();

        // Increment topic proficiency in SkillProfile
        const skillProfile = await SkillProfile.findOne({ user: userId });
        if (skillProfile) {
          problem.topicTags.forEach((tag) => {
            if (skillProfile.topicScores[tag] !== undefined) {
              const boost = problem.difficulty === 'Hard' ? 6 : problem.difficulty === 'Medium' ? 4 : 2;
              skillProfile.topicScores[tag] = Math.min(100, skillProfile.topicScores[tag] + boost);
            }
          });
          skillProfile.updateStrengthsAndWeaknesses();
          await skillProfile.save();
        }
      }

      // If submitted in the context of a Contest, update the contest leaderboard
      if (contestId) {
        const contest = await Contest.findById(contestId);
        if (contest) {
          let userStanding = contest.scoreboard.find((entry) => entry.user.toString() === userId);
          if (!userStanding) {
            const userDoc = await User.findById(userId);
            userStanding = {
              user: userId,
              username: userDoc.name,
              avatar: userDoc.profile.avatar,
              score: 0,
              penaltyTime: 0,
              rank: 1,
              problemStats: []
            };
            contest.scoreboard.push(userStanding);
          }

          let probStat = userStanding.problemStats.find(
            (ps) => ps.problem.toString() === problemId
          );

          if (!probStat) {
            probStat = {
              problem: problemId,
              solved: true,
              solvedAt: new Date(),
              wrongAttempts: 0,
              pointsAwarded: problem.points || 100
            };
            userStanding.problemStats.push(probStat);
            userStanding.score += probStat.pointsAwarded;
          } else if (!probStat.solved) {
            probStat.solved = true;
            probStat.solvedAt = new Date();
            probStat.pointsAwarded = problem.points || 100;
            userStanding.score += probStat.pointsAwarded;
          }

          // Sort scoreboard by score desc, penaltyTime asc
          contest.scoreboard.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.penaltyTime - b.penaltyTime;
          });

          // Assign ranks
          contest.scoreboard.forEach((entry, idx) => {
            entry.rank = idx + 1;
          });

          await contest.save();
        }
      }
    } else if (contestId) {
      // Record wrong attempt penalty for contest
      const contest = await Contest.findById(contestId);
      if (contest) {
        let userStanding = contest.scoreboard.find((entry) => entry.user.toString() === userId);
        if (userStanding) {
          let probStat = userStanding.problemStats.find(
            (ps) => ps.problem.toString() === problemId
          );
          if (!probStat) {
            probStat = {
              problem: problemId,
              solved: false,
              wrongAttempts: 1,
              pointsAwarded: 0
            };
            userStanding.problemStats.push(probStat);
          } else if (!probStat.solved) {
            probStat.wrongAttempts += 1;
          }
          userStanding.penaltyTime += 10; // 10 min penalty per wrong attempt
          await contest.save();
        }
      }
    }

    res.json({
      success: true,
      submission: {
        id: submission._id,
        status: submission.status,
        statusCode: submission.statusCode,
        executionTime: submission.executionTime,
        memory: submission.memory,
        passedTestCases: submission.passedTestCases,
        totalTestCases: submission.totalTestCases,
        testResults: submission.testResults,
        errorLog: submission.errorLog,
        pointsAwarded,
        createdAt: submission.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's past submissions for a problem
 * @route   GET /api/judge/submissions/:problemId
 */
export const getSubmissionsForProblem = async (req, res, next) => {
  try {
    const { problemId } = req.params;
    const submissions = await Submission.find({
      user: req.user.id,
      problem: problemId
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    next(error);
  }
};
