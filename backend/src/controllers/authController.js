import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { SkillProfile } from '../models/SkillProfile.js';
import { config } from '../config/env.js';

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

/**
 * @desc    Register a new user & initialize skill profile
 * @route   POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password || typeof email !== 'string' || typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid name, email, and password.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format (e.g., yourname@domain.com).'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password,
      profile: {
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedName)}`
      }
    });

    // Initialize default skill profile
    const skillProfile = await SkillProfile.create({
      user: user._id,
      topicScores: {
        'Arrays': 50,
        'Strings': 50,
        'Dynamic Programming': 30,
        'Graphs': 30,
        'Trees': 40,
        'Searching & Sorting': 50,
        'Math & Logic': 45,
        'Greedy': 40
      }
    });
    if (skillProfile.updateStrengthsAndWeaknesses) {
      skillProfile.updateStrengthsAndWeaknesses();
    }
    await skillProfile.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        rating: user.rating || 1200,
        points: user.points || 0,
        profile: user.profile,
        hasCompletedAssessment: !!user.hasCompletedAssessment
      }
    });
  } catch (error) {
    console.error('[Auth Register Error]:', error);
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rating: user.rating,
        points: user.points,
        profile: user.profile,
        hasCompletedAssessment: user.hasCompletedAssessment
      }
    });
  } catch (error) {
    console.error('[Auth Login Error]:', error);
    next(error);
  }
};

/**
 * @desc    Get current logged in user & skill profile
 * @route   GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const skillProfile = await SkillProfile.findOne({ user: req.user.id });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rating: user.rating,
        points: user.points,
        globalRank: user.globalRank,
        profile: user.profile,
        hasCompletedAssessment: user.hasCompletedAssessment
      },
      skillProfile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, github, avatar } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (bio !== undefined) user.profile.bio = bio;
    if (github !== undefined) user.profile.github = github;
    if (avatar) user.profile.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile
      }
    });
  } catch (error) {
    next(error);
  }
};
