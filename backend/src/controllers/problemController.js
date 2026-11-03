import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';

/**
 * @desc    Get all problems with filtering, search, and pagination
 * @route   GET /api/problems
 */
export const getProblems = async (req, res, next) => {
  try {
    const { difficulty, topic, search, sort = 'createdAt', order = 'desc', page = 1, limit = 100 } = req.query;

    const query = {};

    if (difficulty && ['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      query.difficulty = difficulty;
    }

    if (topic) {
      query.topicTags = { $in: [new RegExp(topic, 'i')] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { topicTags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sort]: sortOrder };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [problems, total] = await Promise.all([
      Problem.find(query)
        .select('-hiddenTestCases')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),
      Problem.countDocuments(query)
    ]);

    // If user is authenticated, check which problems they have solved
    let solvedProblemIds = new Set();
    if (req.user) {
      const solved = await Submission.find({
        user: req.user.id,
        status: 'Accepted'
      }).distinct('problem');
      solvedProblemIds = new Set(solved.map((id) => id.toString()));
    }

    const problemsWithSolvedState = problems.map((p) => ({
      ...p.toObject(),
      isSolved: solvedProblemIds.has(p._id.toString())
    }));

    res.json({
      success: true,
      count: problemsWithSolvedState.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      problems: problemsWithSolvedState
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single problem by slug or ID
 * @route   GET /api/problems/:slug
 */
export const getProblemBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Search by slug first, fallback to id if valid ObjectId
    let problem = await Problem.findOne({ slug }).select('-hiddenTestCases');
    if (!problem && slug.match(/^[0-9a-fA-F]{24}$/)) {
      problem = await Problem.findById(slug).select('-hiddenTestCases');
    }

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: `Problem with slug/id '${slug}' not found.`
      });
    }

    let isSolved = false;
    let pastSubmissions = [];

    if (req.user) {
      const solved = await Submission.findOne({
        user: req.user.id,
        problem: problem._id,
        status: 'Accepted'
      });
      isSolved = !!solved;

      pastSubmissions = await Submission.find({
        user: req.user.id,
        problem: problem._id
      })
        .select('status statusCode executionTime memory language createdAt')
        .sort({ createdAt: -1 })
        .limit(5);
    }

    res.json({
      success: true,
      problem: {
        ...problem.toObject(),
        isSolved
      },
      pastSubmissions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new problem (Admin)
 * @route   POST /api/problems
 */
export const createProblem = async (req, res, next) => {
  try {
    const {
      title,
      description,
      difficulty,
      topicTags,
      constraints,
      sampleTestCases,
      hiddenTestCases,
      starterTemplates,
      hints
    } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const problem = await Problem.create({
      title,
      slug,
      description,
      difficulty,
      topicTags,
      constraints,
      sampleTestCases,
      hiddenTestCases,
      starterTemplates,
      hints
    });

    res.status(201).json({
      success: true,
      problem
    });
  } catch (error) {
    next(error);
  }
};
