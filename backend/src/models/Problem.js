import mongoose from 'mongoose';
import { createEmbeddedModel } from '../config/embeddedStore.js';

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Problem title is required'],
      trim: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Problem description is required']
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
      default: 'Easy'
    },
    topicTags: [
      {
        type: String,
        required: true,
        trim: true
      }
    ],
    constraints: [
      {
        type: String
      }
    ],
    sampleTestCases: [testCaseSchema],
    hiddenTestCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
      }
    ],
    starterTemplates: {
      javascript: {
        type: String,
        default: 'function solution(input) {\n  // Write your code here\n  return "";\n}'
      },
      python: {
        type: String,
        default: 'def solution(input_str):\n    # Write your code here\n    return ""'
      },
      cpp: {
        type: String,
        default: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}'
      },
      java: {
        type: String,
        default: 'import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}'
      }
    },
    acceptanceRate: {
      type: Number,
      default: 0
    },
    totalSubmissions: {
      type: Number,
      default: 0
    },
    totalAccepted: {
      type: Number,
      default: 0
    },
    points: {
      type: Number,
      default: 100
    },
    hints: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const MongooseProblem = mongoose.model('Problem', problemSchema);
const embeddedProblemModel = createEmbeddedModel('problems');

export const Problem = new Proxy(MongooseProblem, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    return embeddedProblemModel[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return embeddedProblemModel.createInstance(args[0]);
  }
});
