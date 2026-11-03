import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { createEmbeddedModel } from '../config/embeddedStore.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'instructor'],
      default: 'user'
    },
    rating: {
      type: Number,
      default: 1200
    },
    points: {
      type: Number,
      default: 0
    },
    globalRank: {
      type: Number,
      default: 0
    },
    profile: {
      avatar: {
        type: String,
        default: 'https://api.dicebear.com/7.x/bottts/svg?seed=coder'
      },
      bio: {
        type: String,
        default: 'Algorithmic problem solver & software engineer'
      },
      github: {
        type: String,
        default: ''
      },
      totalSolved: {
        type: Number,
        default: 0
      },
      easySolved: {
        type: Number,
        default: 0
      },
      mediumSolved: {
        type: Number,
        default: 0
      },
      hardSolved: {
        type: Number,
        default: 0
      }
    },
    hasCompletedAssessment: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const MongooseUser = mongoose.model('User', userSchema);
const embeddedUserModel = createEmbeddedModel('users');

export const User = new Proxy(MongooseUser, {
  get(target, prop) {
    if (mongoose.connection.readyState === 1) {
      return target[prop];
    }
    return embeddedUserModel[prop];
  },
  construct(target, args) {
    if (mongoose.connection.readyState === 1) {
      return new target(...args);
    }
    return embeddedUserModel.createInstance(args[0]);
  }
});
