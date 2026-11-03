import mongoose from 'mongoose';
import { createEmbeddedModel } from '../config/embeddedStore.js';

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true
    },
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      default: null
    },
    sourceCode: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['javascript', 'python', 'cpp', 'java'],
      required: true
    },
    status: {
      type: String,
      enum: [
        'Accepted',
        'Wrong Answer',
        'Time Limit Exceeded',
        'Runtime Error',
        'Compilation Error',
        'Pending'
      ],
      default: 'Pending'
    },
    statusCode: {
      type: String,
      enum: ['AC', 'WA', 'TLE', 'RE', 'CE', 'PENDING'],
      default: 'PENDING'
    },
    executionTime: {
      type: Number,
      default: 0
    },
    memory: {
      type: Number,
      default: 0
    },
    passedTestCases: {
      type: Number,
      default: 0
    },
    totalTestCases: {
      type: Number,
      default: 0
    },
    testResults: [
      {
        testCaseIndex: Number,
        status: String,
        input: String,
        expectedOutput: String,
        actualOutput: String,
        executionTime: Number,
        isSample: Boolean,
        error: String
      }
    ],
    errorLog: {
      type: String,
      default: ''
    },
    stdout: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

submissionSchema.index({ user: 1, problem: 1, createdAt: -1 });
submissionSchema.index({ problem: 1, status: 1 });

const MongooseSubmission = mongoose.model('Submission', submissionSchema);
const embeddedSubmissionModel = createEmbeddedModel('submissions');

export const Submission = new Proxy(MongooseSubmission, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    return embeddedSubmissionModel[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return embeddedSubmissionModel.createInstance(args[0]);
  }
});
