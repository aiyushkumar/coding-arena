import mongoose from 'mongoose';
import { createEmbeddedModel } from '../config/embeddedStore.js';

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Contest title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required']
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required']
    },
    registeredUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        registeredAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    problems: [
      {
        problem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Problem',
          required: true
        },
        points: {
          type: Number,
          default: 100
        },
        order: {
          type: Number,
          default: 1
        }
      }
    ],
    scoreboard: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        username: String,
        avatar: String,
        score: {
          type: Number,
          default: 0
        },
        penaltyTime: {
          type: Number,
          default: 0
        },
        rank: {
          type: Number,
          default: 1
        },
        problemStats: [
          {
            problem: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Problem'
            },
            solved: {
              type: Boolean,
              default: false
            },
            solvedAt: Date,
            wrongAttempts: {
              type: Number,
              default: 0
            },
            pointsAwarded: {
              type: Number,
              default: 0
            }
          }
        ]
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

contestSchema.virtual('status').get(function () {
  const now = new Date();
  if (now < this.startTime) return 'upcoming';
  if (now >= this.startTime && now <= this.endTime) return 'active';
  return 'ended';
});

const MongooseContest = mongoose.model('Contest', contestSchema);
const embeddedContestModel = createEmbeddedModel('contests');

export const Contest = new Proxy(MongooseContest, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    return embeddedContestModel[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return embeddedContestModel.createInstance(args[0]);
  }
});
