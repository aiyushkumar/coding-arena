import mongoose from 'mongoose';
import { createEmbeddedModel } from '../config/embeddedStore.js';

const skillProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    topicScores: {
      'Arrays': { type: Number, min: 0, max: 100, default: 50 },
      'Strings': { type: Number, min: 0, max: 100, default: 50 },
      'Dynamic Programming': { type: Number, min: 0, max: 100, default: 30 },
      'Graphs': { type: Number, min: 0, max: 100, default: 30 },
      'Trees': { type: Number, min: 0, max: 100, default: 40 },
      'Searching & Sorting': { type: Number, min: 0, max: 100, default: 50 },
      'Math & Logic': { type: Number, min: 0, max: 100, default: 45 },
      'Greedy': { type: Number, min: 0, max: 100, default: 40 }
    },
    overallProficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 42
    },
    strengths: [
      {
        type: String
      }
    ],
    weaknesses: [
      {
        type: String
      }
    ],
    recommendedFocus: {
      type: String,
      default: 'Arrays & Dynamic Programming'
    },
    lastAssessedAt: {
      type: Date,
      default: Date.now
    },
    assessmentHistory: [
      {
        date: { type: Date, default: Date.now },
        scores: { type: Map, of: Number },
        overallProficiency: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

skillProfileSchema.methods.updateStrengthsAndWeaknesses = function () {
  const scores = this.topicScores;
  const entries = Object.entries(scores.toObject ? scores.toObject() : scores);
  
  this.strengths = entries
    .filter(([_, score]) => score >= 65)
    .map(([topic]) => topic);

  this.weaknesses = entries
    .filter(([_, score]) => score < 50)
    .sort((a, b) => a[1] - b[1])
    .map(([topic]) => topic);

  const total = entries.reduce((acc, curr) => acc + curr[1], 0);
  this.overallProficiency = Math.round(total / entries.length);
  
  if (this.weaknesses.length > 0) {
    this.recommendedFocus = this.weaknesses[0];
  } else {
    this.recommendedFocus = 'Master Advanced Dynamic Programming & Graph Theory';
  }
};

const MongooseSkillProfile = mongoose.model('SkillProfile', skillProfileSchema);
const embeddedSkillModel = createEmbeddedModel('skillProfiles');

export const SkillProfile = new Proxy(MongooseSkillProfile, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    return embeddedSkillModel[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return embeddedSkillModel.createInstance(args[0]);
  }
});
