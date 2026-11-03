import { Problem } from '../models/Problem.js';
import { Submission } from '../models/Submission.js';
import { SkillProfile } from '../models/SkillProfile.js';

export const getPersonalizedRecommendations = async (userId, limit = 5) => {
  // 1. Get user's skill profile
  let skillProfile = await SkillProfile.findOne({ user: userId });

  if (!skillProfile) {
    // Create a default initial profile if not yet created
    skillProfile = await SkillProfile.create({
      user: userId,
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
    skillProfile.updateStrengthsAndWeaknesses();
    await skillProfile.save();
  }

  // 2. Identify topics sorted by lowest score (weakest first)
  const scoresObj = skillProfile.topicScores.toObject
    ? skillProfile.topicScores.toObject()
    : skillProfile.topicScores;

  const sortedTopics = Object.entries(scoresObj).sort((a, b) => a[1] - b[1]);

  // 3. Find IDs of problems the user has already solved
  const acceptedSubmissions = await Submission.find({
    user: userId,
    status: 'Accepted'
  }).distinct('problem');

  const recommendations = [];
  const visitedProblemIds = new Set(acceptedSubmissions.map((id) => id.toString()));

  // 4. Iterate over weak topics and query suitable unsolved problems
  for (const [topic, score] of sortedTopics) {
    if (recommendations.length >= limit) break;

    // Pick appropriate difficulty tier based on current score
    let targetDifficulty = ['Easy', 'Medium'];
    if (score < 40) {
      targetDifficulty = ['Easy', 'Medium'];
    } else if (score < 70) {
      targetDifficulty = ['Medium', 'Easy'];
    } else {
      targetDifficulty = ['Hard', 'Medium'];
    }

    const candidateQuery = {
      topicTags: { $in: [new RegExp(topic, 'i')] }
    };
    if (visitedProblemIds.size > 0) {
      candidateQuery._id = { $nin: Array.from(visitedProblemIds) };
    }

    const candidateProblems = await Problem.find(candidateQuery)
      .sort({ acceptanceRate: -1 })
      .limit(3);

    for (const prob of candidateProblems) {
      if (recommendations.length >= limit) break;
      if (!visitedProblemIds.has(prob._id.toString())) {
        visitedProblemIds.add(prob._id.toString());

        let urgency = 'High';
        let reason = `Recommended because your proficiency in ${topic} is ${score}%. Solving this will strengthen your algorithmic fundamentals.`;

        if (score >= 60) {
          urgency = 'Medium';
          reason = `Level up your solid understanding of ${topic} (${score}%) with this challenge.`;
        }

        recommendations.push({
          problem: {
            _id: prob._id,
            title: prob.title,
            slug: prob.slug,
            difficulty: prob.difficulty,
            topicTags: prob.topicTags,
            acceptanceRate: prob.acceptanceRate,
            points: prob.points
          },
          targetTopic: topic,
          currentProficiency: score,
          targetDifficulty: prob.difficulty,
          urgency,
          reason
        });
      }
    }
  }

  // Fallback if not enough topic matches (e.g. user solved everything in weakest topics)
  if (recommendations.length < limit) {
    const generalQuery = {};
    if (visitedProblemIds.size > 0) {
      generalQuery._id = { $nin: Array.from(visitedProblemIds) };
    }
    const generalProblems = await Problem.find(generalQuery)
      .sort({ acceptanceRate: -1 })
      .limit(limit - recommendations.length);

    for (const prob of generalProblems) {
      recommendations.push({
        problem: {
          _id: prob._id,
          title: prob.title,
          slug: prob.slug,
          difficulty: prob.difficulty,
          topicTags: prob.topicTags,
          acceptanceRate: prob.acceptanceRate,
          points: prob.points
        },
        targetTopic: prob.topicTags[0] || 'General',
        currentProficiency: 50,
        targetDifficulty: prob.difficulty,
        urgency: 'Medium',
        reason: 'Recommended for balanced competitive programming practice.'
      });
    }
  }

  return {
    recommendations,
    skillSummary: {
      overallProficiency: skillProfile.overallProficiency,
      weaknesses: skillProfile.weaknesses,
      strengths: skillProfile.strengths,
      recommendedFocus: skillProfile.recommendedFocus
    }
  };
};
