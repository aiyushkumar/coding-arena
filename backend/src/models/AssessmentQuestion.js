import mongoose from 'mongoose';
import { createEmbeddedModel } from '../config/embeddedStore.js';

const assessmentQuestionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      enum: [
        'Arrays',
        'Strings',
        'Dynamic Programming',
        'Graphs',
        'Trees',
        'Searching & Sorting',
        'Math & Logic',
        'Greedy'
      ]
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    question: {
      type: String,
      required: true
    },
    codeSnippet: {
      type: String,
      default: ''
    },
    options: [
      {
        type: String,
        required: true
      }
    ],
    correctOptionIndex: {
      type: Number,
      required: true
    },
    explanation: {
      type: String,
      default: ''
    },
    weight: {
      type: Number,
      default: 20
    }
  },
  {
    timestamps: true
  }
);

const MongooseAssessmentQuestion = mongoose.model(
  'AssessmentQuestion',
  assessmentQuestionSchema
);
const embeddedQuestionModel = createEmbeddedModel('assessmentQuestions');

export const AssessmentQuestion = new Proxy(MongooseAssessmentQuestion, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    return embeddedQuestionModel[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return embeddedQuestionModel.createInstance(args[0]);
  }
});
