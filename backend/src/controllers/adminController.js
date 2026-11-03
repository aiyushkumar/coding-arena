import { User } from '../models/User.js';
import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';
import { Contest } from '../models/Contest.js';
import { SkillProfile } from '../models/SkillProfile.js';
import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { getRawDatabase } from '../config/embeddedStore.js';
import mongoose from 'mongoose';

/**
 * @desc    Get complete database introspection for Admin view
 * @route   GET /api/admin/database
 */
export const getDatabaseOverview = async (req, res, next) => {
  try {
    const isLiveMongo = mongoose.connection.readyState === 1;

    let users, problems, submissions, contests, skillProfiles, questions;

    if (isLiveMongo) {
      [users, problems, submissions, contests, skillProfiles, questions] =
        await Promise.all([
          User.find().select('-password'),
          Problem.find(),
          Submission.find().populate('problem', 'title slug').populate('user', 'name email'),
          Contest.find(),
          SkillProfile.find(),
          AssessmentQuestion.find()
        ]);
    } else {
      const raw = getRawDatabase();
      users = raw.collections.users;
      problems = raw.collections.problems;
      submissions = raw.collections.submissions;
      contests = raw.collections.contests;
      skillProfiles = raw.collections.skillProfiles;
      questions = raw.collections.assessmentQuestions;
    }

    res.json({
      success: true,
      storageEngine: isLiveMongo ? 'MongoDB Daemon (Live Connection)' : 'Embedded Persistent JSON Engine (backend/data/coding_arena_db.json)',
      stats: {
        totalUsers: users.length,
        totalProblems: problems.length,
        totalSubmissions: submissions.length,
        totalContests: contests.length,
        totalSkillProfiles: skillProfiles.length,
        totalAssessmentQuestions: questions.length
      },
      collections: {
        users,
        problems,
        submissions,
        contests,
        skillProfiles,
        assessmentQuestions: questions
      }
    });
  } catch (error) {
    next(error);
  }
};
