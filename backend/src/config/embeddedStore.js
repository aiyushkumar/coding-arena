import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { assessmentQuestionsData, problemsData } from '../data/rawSeedData.js';

const DB_PATH = path.resolve(process.cwd(), 'data', 'coding_arena_db.json');

// Generate 24-character hex ID matching MongoDB ObjectId format
export const generateId = () => crypto.randomBytes(12).toString('hex');

// In-memory state
let db = {
  users: [],
  skillProfiles: [],
  problems: [],
  submissions: [],
  contests: [],
  assessmentQuestions: []
};

let isInitialized = false;

// Standard seeded accounts for the platform
export const defaultSeedUsers = [
  {
    name: 'Admin Master',
    email: 'admin@arena.dev',
    password: 'password123',
    role: 'admin',
    rating: 2150,
    points: 2500,
    hasCompletedAssessment: true,
    profile: {
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin',
      bio: 'Coding Arena Chief Architect & Online Judge Administrator',
      github: 'https://github.com/admin-arena',
      totalSolved: 50,
      easySolved: 20,
      mediumSolved: 22,
      hardSolved: 8
    },
    topicScores: {
      'Arrays': 95,
      'Strings': 90,
      'Dynamic Programming': 95,
      'Graphs': 90,
      'Trees': 92,
      'Searching & Sorting': 94,
      'Math & Logic': 90,
      'Greedy': 92
    }
  },
  {
    name: 'Alex Rivera',
    email: 'alex@arena.dev',
    password: 'password123',
    role: 'user',
    rating: 1980,
    points: 1250,
    hasCompletedAssessment: true,
    profile: {
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
      bio: 'Competitive programmer | Dynamic Programming fanatic',
      github: 'https://github.com/alex-rivera',
      totalSolved: 34,
      easySolved: 14,
      mediumSolved: 16,
      hardSolved: 4
    },
    topicScores: {
      'Arrays': 88,
      'Strings': 80,
      'Dynamic Programming': 92,
      'Graphs': 74,
      'Trees': 78,
      'Searching & Sorting': 85,
      'Math & Logic': 70,
      'Greedy': 82
    }
  },
  {
    name: 'Sarah Chen',
    email: 'sarah@arena.dev',
    password: 'password123',
    role: 'user',
    rating: 1820,
    points: 980,
    hasCompletedAssessment: true,
    profile: {
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah',
      bio: 'Software engineer at cloud infra | Graph theory enthusiast',
      github: 'https://github.com/sarah-chen',
      totalSolved: 26,
      easySolved: 12,
      mediumSolved: 12,
      hardSolved: 2
    },
    topicScores: {
      'Arrays': 75,
      'Strings': 70,
      'Dynamic Programming': 60,
      'Graphs': 88,
      'Trees': 82,
      'Searching & Sorting': 78,
      'Math & Logic': 65,
      'Greedy': 68
    }
  },
  {
    name: 'David Kim',
    email: 'david@arena.dev',
    password: 'password123',
    role: 'user',
    rating: 1540,
    points: 620,
    hasCompletedAssessment: true,
    profile: {
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=David',
      bio: 'Computer Science undergrad | Leveling up my data structures',
      github: 'https://github.com/david-kim',
      totalSolved: 18,
      easySolved: 10,
      mediumSolved: 7,
      hardSolved: 1
    },
    topicScores: {
      'Arrays': 65,
      'Strings': 60,
      'Dynamic Programming': 35,
      'Graphs': 40,
      'Trees': 55,
      'Searching & Sorting': 62,
      'Math & Logic': 50,
      'Greedy': 48
    }
  },
  {
    name: 'Demo Student',
    email: 'demo@codingarena.io',
    password: 'password123',
    role: 'user',
    rating: 1250,
    points: 150,
    hasCompletedAssessment: false,
    profile: {
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Student',
      bio: 'Exploring competitive algorithms with Coding Arena AI tutor',
      github: 'https://github.com/demo-student',
      totalSolved: 3,
      easySolved: 2,
      mediumSolved: 1,
      hardSolved: 0
    },
    topicScores: {
      'Arrays': 45,
      'Strings': 40,
      'Dynamic Programming': 25,
      'Graphs': 30,
      'Trees': 35,
      'Searching & Sorting': 50,
      'Math & Logic': 35,
      'Greedy': 30
    }
  }
];

/**
 * Save current state to JSON file
 */
export const persistDB = () => {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[EmbeddedStore] Failed to write DB to disk:', err.message);
  }
};

/**
 * Wrap a raw document with Mongoose-like helper methods
 */
export const wrapDocument = (collectionName, doc) => {
  if (!doc || typeof doc !== 'object') return doc;

  const wrapped = { ...doc };

  // Ensure _id and id exist as string
  if (!wrapped._id) wrapped._id = generateId();
  wrapped.id = wrapped._id.toString();

  // toObject and toJSON methods
  wrapped.toObject = function () {
    const copy = { ...this };
    delete copy.toObject;
    delete copy.toJSON;
    delete copy.save;
    delete copy.matchPassword;
    delete copy.updateStrengthsAndWeaknesses;
    return copy;
  };

  wrapped.toJSON = wrapped.toObject;

  // Document .save() method
  wrapped.save = async function () {
    if (!isInitialized) initEmbeddedStore();
    const coll = db[collectionName] || [];
    const idx = coll.findIndex(
      (item) => String(item._id) === String(this._id) || String(item.id) === String(this.id)
    );
    const plain = this.toObject();

    if (collectionName === 'users' && plain.password && !plain.password.startsWith('$2')) {
      plain.password = bcrypt.hashSync(plain.password, 10);
    }

    if (idx >= 0) {
      coll[idx] = plain;
    } else {
      coll.push(plain);
    }
    persistDB();
    return this;
  };

  // User-specific method
  if (collectionName === 'users') {
    wrapped.matchPassword = async function (enteredPassword) {
      if (!this.password || !enteredPassword) return false;
      try {
        return bcrypt.compareSync(enteredPassword, this.password);
      } catch (e) {
        return false;
      }
    };
  }

  // SkillProfile-specific method
  if (collectionName === 'skillProfiles') {
    wrapped.updateStrengthsAndWeaknesses = function () {
      const scores = this.topicScores || {};
      const entries = Object.entries(scores.toObject ? scores.toObject() : scores);

      this.strengths = entries
        .filter(([_, score]) => score >= 65)
        .map(([topic]) => topic);

      this.weaknesses = entries
        .filter(([_, score]) => score < 50)
        .sort((a, b) => a[1] - b[1])
        .map(([topic]) => topic);

      const total = entries.reduce((acc, curr) => acc + curr[1], 0);
      this.overallProficiency = entries.length ? Math.round(total / entries.length) : 45;

      if (this.weaknesses.length > 0) {
        this.recommendedFocus = this.weaknesses[0];
      } else {
        this.recommendedFocus = 'Master Advanced Dynamic Programming & Graph Theory';
      }
    };
  }

  // Contest-specific virtuals
  if (collectionName === 'contests') {
    const now = new Date();
    const start = new Date(wrapped.startTime);
    const end = new Date(wrapped.endTime);
    if (now < start) wrapped.status = 'upcoming';
    else if (now >= start && now <= end) wrapped.status = 'active';
    else wrapped.status = 'ended';
  }

  return wrapped;
};

/**
 * Filter evaluator for MongoDB-style queries
 */
const matchesFilter = (item, filter) => {
  if (!filter || Object.keys(filter).length === 0) return true;

  for (const [key, value] of Object.entries(filter)) {
    if (key === '$or' && Array.isArray(value)) {
      const anyMatch = value.some((subFilter) => matchesFilter(item, subFilter));
      if (!anyMatch) return false;
      continue;
    }

    // ID matching
    if (key === '_id' || key === 'id') {
      const itemId = String(item._id || item.id || '');
      if (value && typeof value === 'object' && !(value instanceof RegExp)) {
        if (value.$in && Array.isArray(value.$in)) {
          const targetIds = value.$in.map((v) => String(v?._id || v || ''));
          if (!targetIds.includes(itemId)) return false;
          continue;
        }
        if (value.$nin && Array.isArray(value.$nin)) {
          const targetIds = value.$nin.map((v) => String(v?._id || v || ''));
          if (targetIds.includes(itemId)) return false;
          continue;
        }
        if (value.$ne !== undefined) {
          const targetId = String(value.$ne?._id || value.$ne || '');
          if (itemId === targetId) return false;
          continue;
        }
      }
      const targetId = String(value?._id || value || '');
      if (itemId !== targetId) return false;
      continue;
    }

    // Relational reference matching (e.g. { user: userId })
    if (key === 'user' || key === 'problem') {
      const itemRef = item[key]?._id ? String(item[key]._id) : String(item[key] || '');
      const filterRef = value?._id ? String(value._id) : String(value || '');
      if (itemRef !== filterRef) return false;
      continue;
    }

    // Access nested properties (e.g. 'profile.bio')
    const itemVal = item[key];

    if (value === null || value === undefined) {
      if (itemVal !== null && itemVal !== undefined) return false;
      continue;
    }

    if (typeof value === 'object' && !(value instanceof RegExp)) {
      if (value.$in && Array.isArray(value.$in)) {
        const matchesIn = value.$in.some((inVal) => {
          const inValStr = inVal && inVal._id ? String(inVal._id) : String(inVal);
          if (inVal instanceof RegExp) {
            if (Array.isArray(itemVal)) {
              return itemVal.some((iv) => inVal.test(String(iv || '')));
            }
            return inVal.test(String(itemVal || ''));
          }
          if (Array.isArray(itemVal)) {
            return itemVal.includes(inVal) || itemVal.some((iv) => String(iv) === inValStr);
          }
          return String(itemVal) === inValStr;
        });
        if (!matchesIn) return false;
        continue;
      }

      if (value.$nin && Array.isArray(value.$nin)) {
        if (Array.isArray(itemVal)) {
          const hasExcluded = value.$nin.some((ninVal) => {
            const ninStr = String(ninVal?._id || ninVal);
            return itemVal.some((iv) => String(iv?._id || iv) === ninStr);
          });
          if (hasExcluded) return false;
        } else {
          const strVal = String(itemVal);
          if (value.$nin.some((ninVal) => String(ninVal?._id || ninVal) === strVal)) {
            return false;
          }
        }
        continue;
      }

      if (value.$regex) {
        const regex = new RegExp(value.$regex, value.$options || '');
        if (Array.isArray(itemVal)) {
          if (!itemVal.some((iv) => regex.test(String(iv || '')))) return false;
        } else if (!regex.test(String(itemVal || ''))) {
          return false;
        }
        continue;
      }

      if (value.$ne !== undefined) {
        if (String(itemVal) === String(value.$ne)) return false;
        continue;
      }
    }

    if (value instanceof RegExp) {
      if (Array.isArray(itemVal)) {
        if (!itemVal.some((v) => value.test(String(v)))) return false;
      } else if (!value.test(String(itemVal || ''))) {
        return false;
      }
      continue;
    }

    // Simple equality with case-insensitive handling for emails and slugs
    if (key === 'email' || key === 'slug') {
      if (String(itemVal || '').toLowerCase().trim() !== String(value || '').toLowerCase().trim()) {
        return false;
      }
    } else if (String(itemVal) !== String(value)) {
      return false;
    }
  }

  return true;
};

/**
 * Query Chain Builder providing Mongoose-like syntax:
 * .select(), .sort(), .skip(), .limit(), .populate(), .distinct()
 */
class QueryChain {
  constructor(collectionName, filter = {}) {
    this.collectionName = collectionName;
    this.filter = filter;
    this._selectFields = null;
    this._sortObj = null;
    this._skipCount = 0;
    this._limitCount = null;
    this._populates = [];
    this._distinctField = null;
    this._isSingle = false;
  }

  select(fields) {
    this._selectFields = fields;
    return this;
  }

  sort(sortObj) {
    this._sortObj = sortObj;
    return this;
  }

  skip(count) {
    this._skipCount = parseInt(count, 10) || 0;
    return this;
  }

  limit(count) {
    this._limitCount = parseInt(count, 10);
    return this;
  }

  populate(path, selectFields) {
    this._populates.push({ path, selectFields });
    return this;
  }

  distinct(field) {
    this._distinctField = field;
    return this;
  }

  async execute() {
    if (!isInitialized) initEmbeddedStore();
    let items = (db[this.collectionName] || []).filter((item) =>
      matchesFilter(item, this.filter)
    );

    // If distinct requested
    if (this._distinctField) {
      const set = new Set();
      items.forEach((item) => {
        const val = item[this._distinctField];
        if (val !== undefined && val !== null) {
          set.add(typeof val === 'object' ? val.toString() : val);
        }
      });
      return Array.from(set);
    }

    // Sorting
    if (this._sortObj && typeof this._sortObj === 'object') {
      const [sortField, sortOrder] = Object.entries(this._sortObj)[0] || [];
      if (sortField) {
        items.sort((a, b) => {
          let aVal = a[sortField];
          let bVal = b[sortField];

          if (aVal instanceof Date || !isNaN(Date.parse(aVal))) {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
          }

          if (aVal < bVal) return sortOrder === 1 ? -1 : 1;
          if (aVal > bVal) return sortOrder === 1 ? 1 : -1;
          return 0;
        });
      }
    }

    // Pagination
    if (this._skipCount > 0) {
      items = items.slice(this._skipCount);
    }
    if (this._limitCount !== null && this._limitCount !== undefined) {
      items = items.slice(0, this._limitCount);
    }

    // Populates
    for (const pop of this._populates) {
      const pPath = pop.path;
      if (pPath === 'problems.problem' && this.collectionName === 'contests') {
        items = items.map((contest) => {
          const clone = { ...contest };
          if (Array.isArray(clone.problems)) {
            clone.problems = clone.problems.map((probEntry) => {
              const probId = probEntry.problem?._id || probEntry.problem;
              const foundProblem = db.problems.find(
                (p) => String(p._id) === String(probId)
              );
              return {
                ...probEntry,
                problem: foundProblem ? wrapDocument('problems', foundProblem) : null
              };
            });
          }
          return clone;
        });
      } else if (pPath === 'scoreboard.user' && this.collectionName === 'contests') {
        items = items.map((contest) => {
          const clone = { ...contest };
          if (Array.isArray(clone.scoreboard)) {
            clone.scoreboard = clone.scoreboard.map((entry) => {
              const uId = entry.user?._id || entry.user;
              const foundUser = db.users.find((u) => String(u._id) === String(uId));
              return {
                ...entry,
                user: foundUser
                  ? { _id: foundUser._id, name: foundUser.name, profile: foundUser.profile }
                  : entry.user
              };
            });
          }
          return clone;
        });
      } else if (pPath === 'problem' && this.collectionName === 'submissions') {
        items = items.map((sub) => {
          const prob = db.problems.find((p) => String(p._id) === String(sub.problem));
          return {
            ...sub,
            problem: prob ? { _id: prob._id, title: prob.title, slug: prob.slug, difficulty: prob.difficulty } : sub.problem
          };
        });
      } else if (pPath === 'user' && this.collectionName === 'submissions') {
        items = items.map((sub) => {
          const u = db.users.find((usr) => String(usr._id) === String(sub.user));
          return {
            ...sub,
            user: u ? { _id: u._id, name: u.name, email: u.email, profile: u.profile } : sub.user
          };
        });
      }
    }

    // Field selection
    let resultDocs = items.map((item) => wrapDocument(this.collectionName, item));

    if (this._selectFields) {
      if (this._selectFields.startsWith('-')) {
        const fieldList = this._selectFields
          .replace(/^-/, '')
          .split(' ')
          .map((s) => s.trim())
          .filter(Boolean);

        resultDocs = resultDocs.map((doc) => {
          const plain = doc.toObject ? doc.toObject() : { ...doc };
          fieldList.forEach((f) => delete plain[f]);
          return wrapDocument(this.collectionName, plain);
        });
      } else if (!this._selectFields.startsWith('+')) {
        const fieldList = this._selectFields
          .split(' ')
          .map((s) => s.trim())
          .filter(Boolean);

        resultDocs = resultDocs.map((doc) => {
          const plain = {};
          plain._id = doc._id;
          plain.id = doc.id;
          fieldList.forEach((f) => {
            if (doc[f] !== undefined) plain[f] = doc[f];
          });
          return wrapDocument(this.collectionName, plain);
        });
      }
    }

    if (this._isSingle) {
      return resultDocs[0] || null;
    }

    return resultDocs;
  }

  // Make QueryChain awaitable
  then(resolve, reject) {
    return this.execute().then(resolve, reject);
  }
}

/**
 * Model Factory creating a drop-in Mongoose-compatible interface
 */
export const createEmbeddedModel = (collectionName) => {
  return {
    collectionName,

    find(filter = {}) {
      return new QueryChain(collectionName, filter);
    },

    findOne(filter = {}) {
      const chain = new QueryChain(collectionName, filter);
      chain._isSingle = true;
      chain.limit(1);
      return chain;
    },

    findById(id) {
      const strId = id && id._id ? id._id.toString() : (id ? id.toString() : '');
      const chain = new QueryChain(collectionName, { _id: strId });
      chain._isSingle = true;
      chain.limit(1);
      return chain;
    },

    createInstance(data = {}) {
      return wrapDocument(collectionName, { ...data });
    },

    async findByIdAndUpdate(id, update, options = {}) {
      if (!isInitialized) initEmbeddedStore();
      const strId = id && id._id ? id._id.toString() : (id ? id.toString() : '');
      const coll = db[collectionName] || [];
      const idx = coll.findIndex((i) => String(i._id) === strId || String(i.id) === strId);
      if (idx === -1) return null;

      const existing = coll[idx];
      const updated = { ...existing, ...update };
      coll[idx] = updated;

      persistDB();
      return wrapDocument(collectionName, updated);
    },

    async create(data) {
      if (!isInitialized) initEmbeddedStore();
      const coll = db[collectionName] || [];
      const doc = { ...data };
      if (!doc._id) doc._id = generateId();
      doc.id = doc._id.toString();
      doc.createdAt = new Date().toISOString();
      doc.updatedAt = new Date().toISOString();

      if (collectionName === 'users') {
        if (!doc.role) doc.role = 'user';
        if (doc.rating === undefined) doc.rating = 1200;
        if (doc.points === undefined) doc.points = 0;
        if (doc.globalRank === undefined) doc.globalRank = 0;
        if (doc.hasCompletedAssessment === undefined) doc.hasCompletedAssessment = false;
        doc.profile = {
          avatar: doc.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(doc.name || 'coder')}`,
          bio: doc.profile?.bio || 'Algorithmic problem solver & software engineer',
          github: doc.profile?.github || '',
          totalSolved: doc.profile?.totalSolved || 0,
          easySolved: doc.profile?.easySolved || 0,
          mediumSolved: doc.profile?.mediumSolved || 0,
          hardSolved: doc.profile?.hardSolved || 0
        };
        if (doc.email) {
          doc.email = doc.email.toLowerCase().trim();
        }
        if (doc.password && !doc.password.startsWith('$2')) {
          doc.password = bcrypt.hashSync(doc.password, 10);
        }
      }

      if (collectionName === 'skillProfiles') {
        if (doc.overallProficiency === undefined) doc.overallProficiency = 42;
        if (!doc.strengths) doc.strengths = [];
        if (!doc.weaknesses) doc.weaknesses = [];
        if (!doc.recommendedFocus) doc.recommendedFocus = 'Arrays & Dynamic Programming';
        if (!doc.assessmentHistory) doc.assessmentHistory = [];
        if (!doc.lastAssessedAt) doc.lastAssessedAt = new Date().toISOString();
      }

      coll.push(doc);
      persistDB();
      return wrapDocument(collectionName, doc);
    },

    async countDocuments(filter = {}) {
      const chain = new QueryChain(collectionName, filter);
      const results = await chain.execute();
      return results.length;
    },

    async insertMany(docs) {
      if (!isInitialized) initEmbeddedStore();
      const coll = db[collectionName] || [];
      const added = docs.map((d) => {
        const item = { ...d };
        if (!item._id) item._id = generateId();
        item.id = item._id.toString();
        item.createdAt = new Date().toISOString();
        item.updatedAt = new Date().toISOString();
        if (collectionName === 'users' && item.password) {
          item.password = bcrypt.hashSync(item.password, 10);
        }
        return item;
      });
      coll.push(...added);
      persistDB();
      return added.map((item) => wrapDocument(collectionName, item));
    },

    async deleteMany(filter = {}) {
      if (!isInitialized) initEmbeddedStore();
      if (!filter || Object.keys(filter).length === 0) {
        db[collectionName] = [];
      } else {
        db[collectionName] = (db[collectionName] || []).filter(
          (item) => !matchesFilter(item, filter)
        );
      }
      persistDB();
      return { acknowledged: true, deletedCount: 0 };
    }
  };
};

/**
 * Seed the embedded database with comprehensive realistic competitive programming data
 */
export const seedEmbeddedStore = () => {
  console.log('[EmbeddedStore] Seeding database collections...');

  // 1. Assessment Questions
  db.assessmentQuestions = assessmentQuestionsData.map((q) => ({
    ...q,
    _id: generateId()
  }));

  // 2. Problems
  db.problems = problemsData.map((p) => ({
    ...p,
    _id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  // 3. Demo Users & Profiles
  db.users = [];
  db.skillProfiles = [];

  for (const ru of defaultSeedUsers) {
    const userId = generateId();
    const userDoc = {
      _id: userId,
      id: userId,
      name: ru.name,
      email: ru.email.toLowerCase().trim(),
      password: bcrypt.hashSync(ru.password, 10),
      role: ru.role,
      rating: ru.rating,
      points: ru.points,
      hasCompletedAssessment: ru.hasCompletedAssessment,
      profile: ru.profile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.push(userDoc);

    const profileDoc = {
      _id: generateId(),
      user: userId,
      topicScores: ru.topicScores,
      overallProficiency: 50,
      strengths: [],
      weaknesses: [],
      recommendedFocus: 'Arrays',
      assessmentHistory: [],
      lastAssessedAt: new Date().toISOString()
    };
    const wrappedProfile = wrapDocument('skillProfiles', profileDoc);
    wrappedProfile.updateStrengthsAndWeaknesses();
    db.skillProfiles.push(wrappedProfile.toObject());
  }

  // 4. Contests
  const now = new Date();
  const activeStart = new Date(now.getTime() - 45 * 60 * 1000).toISOString();
  const activeEnd = new Date(now.getTime() + 75 * 60 * 1000).toISOString();
  const upcomingStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
  const upcomingEnd = new Date(new Date(upcomingStart).getTime() + 120 * 60 * 1000).toISOString();
  const pastStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const pastEnd = new Date(new Date(pastStart).getTime() + 120 * 60 * 1000).toISOString();

  const p0 = db.problems[0]?._id;
  const p1 = db.problems[1]?._id || p0;
  const p2 = db.problems[2]?._id || p0;
  const p3 = db.problems[3]?._id || p0;
  const p4 = db.problems[4]?._id || p0;

  const uAdmin = db.users.find((u) => u.email === 'admin@arena.dev') || db.users[0];
  const uAlex = db.users.find((u) => u.email === 'alex@arena.dev') || db.users[0];
  const uSarah = db.users.find((u) => u.email === 'sarah@arena.dev') || db.users[0];
  const uDavid = db.users.find((u) => u.email === 'david@arena.dev') || db.users[0];

  db.contests = [
    {
      _id: generateId(),
      title: 'ByteBlitz Speed Challenge 2026',
      description: 'High-intensity 2-hour algorithmic showdown testing dynamic programming, graph traversal, and two-pointer optimizations.',
      startTime: activeStart,
      endTime: activeEnd,
      problems: [
        { problem: p0, points: 100, order: 1 },
        { problem: p3, points: 200, order: 2 },
        { problem: p4, points: 300, order: 3 }
      ],
      registeredUsers: [
        { user: uAlex._id },
        { user: uSarah._id },
        { user: uDavid._id }
      ],
      scoreboard: [
        {
          user: uAlex._id,
          username: uAlex.name,
          avatar: uAlex.profile?.avatar,
          score: 600,
          penaltyTime: 42,
          rank: 1,
          problemStats: [
            { problem: p0, solved: true, wrongAttempts: 0, pointsAwarded: 100 },
            { problem: p3, solved: true, wrongAttempts: 1, pointsAwarded: 200 },
            { problem: p4, solved: true, wrongAttempts: 0, pointsAwarded: 300 }
          ]
        },
        {
          user: uSarah._id,
          username: uSarah.name,
          avatar: uSarah.profile?.avatar,
          score: 300,
          penaltyTime: 38,
          rank: 2,
          problemStats: [
            { problem: p0, solved: true, wrongAttempts: 0, pointsAwarded: 100 },
            { problem: p3, solved: true, wrongAttempts: 0, pointsAwarded: 200 }
          ]
        },
        {
          user: uDavid._id,
          username: uDavid.name,
          avatar: uDavid.profile?.avatar,
          score: 100,
          penaltyTime: 14,
          rank: 3,
          problemStats: [
            { problem: p0, solved: true, wrongAttempts: 0, pointsAwarded: 100 }
          ]
        }
      ]
    },
    {
      _id: generateId(),
      title: 'Weekly Arena Grand Prix #48',
      description: 'Our flagship weekly tournament featuring four progressively challenging problems. Climb the global rankings!',
      startTime: upcomingStart,
      endTime: upcomingEnd,
      problems: [
        { problem: p1, points: 100, order: 1 },
        { problem: p2, points: 200, order: 2 },
        { problem: p4, points: 300, order: 3 }
      ],
      registeredUsers: [
        { user: uAlex._id },
        { user: uSarah._id }
      ],
      scoreboard: []
    },
    {
      _id: generateId(),
      title: 'Dynamic Programming Invitational Cup',
      description: 'Targeted tournament focused exclusively on memoization, 2D state transitions, and knapsack variants.',
      startTime: pastStart,
      endTime: pastEnd,
      problems: [
        { problem: p2, points: 100, order: 1 },
        { problem: p3, points: 250, order: 2 },
        { problem: p4, points: 400, order: 3 }
      ],
      registeredUsers: [
        { user: uAlex._id },
        { user: uSarah._id }
      ],
      scoreboard: [
        {
          user: uAlex._id,
          username: uAlex.name,
          avatar: uAlex.profile?.avatar,
          score: 750,
          penaltyTime: 65,
          rank: 1
        }
      ]
    }
  ];

  db.submissions = [];

  persistDB();
  console.log(`[EmbeddedStore] Seeded ${db.users.length} users, ${db.problems.length} problems, ${db.contests.length} contests.`);
};

/**
 * Initialize store from file or seed fresh, guaranteeing that
 * default seed users, problems, assessment questions, and contests always exist
 * while preserving all registered accounts.
 */
export const initEmbeddedStore = () => {
  if (isInitialized) return db;

  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object') {
        db.users = Array.isArray(parsed.users) ? parsed.users : [];
        db.skillProfiles = Array.isArray(parsed.skillProfiles) ? parsed.skillProfiles : [];
        db.problems = Array.isArray(parsed.problems) ? parsed.problems : [];
        db.submissions = Array.isArray(parsed.submissions) ? parsed.submissions : [];
        db.contests = Array.isArray(parsed.contests) ? parsed.contests : [];
        db.assessmentQuestions = Array.isArray(parsed.assessmentQuestions) ? parsed.assessmentQuestions : [];
      }
    }
  } catch (e) {
    console.warn('[EmbeddedStore] Existing DB unreadable, regenerating:', e.message);
  }

  // 1. Ensure assessment questions
  if (!db.assessmentQuestions || db.assessmentQuestions.length === 0) {
    console.log('[EmbeddedStore] Seeding diagnostic questions...');
    db.assessmentQuestions = assessmentQuestionsData.map((q) => ({
      ...q,
      _id: generateId()
    }));
  }

  // 2. Ensure all problems from catalog are synced
  if (!db.problems) {
    db.problems = [];
  }
  const existingProblemSlugs = new Set(db.problems.map((p) => p.slug));
  let newProblemsCount = 0;
  for (const p of problemsData) {
    if (!existingProblemSlugs.has(p.slug)) {
      db.problems.push({
        ...p,
        _id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      existingProblemSlugs.add(p.slug);
      newProblemsCount++;
    }
  }
  if (newProblemsCount > 0) {
    console.log(`[EmbeddedStore] Synced ${newProblemsCount} new problems into database.`);
    persistDB();
  }

  // 3. Ensure all default demo & admin users exist
  for (const ru of defaultSeedUsers) {
    const existing = db.users.find(
      (u) => u.email && u.email.toLowerCase().trim() === ru.email.toLowerCase().trim()
    );

    if (!existing) {
      const userId = generateId();
      const userDoc = {
        _id: userId,
        id: userId,
        name: ru.name,
        email: ru.email.toLowerCase().trim(),
        password: bcrypt.hashSync(ru.password, 10),
        role: ru.role,
        rating: ru.rating,
        points: ru.points,
        hasCompletedAssessment: ru.hasCompletedAssessment,
        profile: ru.profile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.users.push(userDoc);

      const profileDoc = {
        _id: generateId(),
        user: userId,
        topicScores: ru.topicScores,
        overallProficiency: 50,
        strengths: [],
        weaknesses: [],
        recommendedFocus: 'Arrays',
        assessmentHistory: [],
        lastAssessedAt: new Date().toISOString()
      };
      const wrappedProfile = wrapDocument('skillProfiles', profileDoc);
      wrappedProfile.updateStrengthsAndWeaknesses();
      db.skillProfiles.push(wrappedProfile.toObject());
    } else {
      // Ensure role and password are properly set for admin
      if (ru.role === 'admin') {
        existing.role = 'admin';
      }
      // Ensure bcrypt password hash
      if (!existing.password || !existing.password.startsWith('$2')) {
        existing.password = bcrypt.hashSync(ru.password, 10);
      }
      // Ensure skillProfile exists for user
      const profExists = db.skillProfiles.find(
        (sp) => String(sp.user) === String(existing._id) || String(sp.user) === String(existing.id)
      );
      if (!profExists) {
        const profileDoc = {
          _id: generateId(),
          user: existing._id,
          topicScores: ru.topicScores || {
            'Arrays': 50,
            'Strings': 50,
            'Dynamic Programming': 30,
            'Graphs': 30,
            'Trees': 40,
            'Searching & Sorting': 50,
            'Math & Logic': 45,
            'Greedy': 40
          },
          overallProficiency: 45,
          strengths: [],
          weaknesses: [],
          recommendedFocus: 'Arrays',
          assessmentHistory: [],
          lastAssessedAt: new Date().toISOString()
        };
        const wrappedProfile = wrapDocument('skillProfiles', profileDoc);
        wrappedProfile.updateStrengthsAndWeaknesses();
        db.skillProfiles.push(wrappedProfile.toObject());
      }
    }
  }

  // 4. Ensure skill profiles exist for any existing registered users
  for (const u of db.users) {
    const profExists = db.skillProfiles.find(
      (sp) => String(sp.user) === String(u._id) || String(sp.user) === String(u.id)
    );
    if (!profExists) {
      const profileDoc = {
        _id: generateId(),
        user: u._id,
        topicScores: {
          'Arrays': 50,
          'Strings': 50,
          'Dynamic Programming': 30,
          'Graphs': 30,
          'Trees': 40,
          'Searching & Sorting': 50,
          'Math & Logic': 45,
          'Greedy': 40
        },
        overallProficiency: 42,
        strengths: [],
        weaknesses: ['Dynamic Programming', 'Graphs', 'Trees'],
        recommendedFocus: 'Dynamic Programming',
        assessmentHistory: [],
        lastAssessedAt: new Date().toISOString()
      };
      const wrappedProfile = wrapDocument('skillProfiles', profileDoc);
      wrappedProfile.updateStrengthsAndWeaknesses();
      db.skillProfiles.push(wrappedProfile.toObject());
    }
  }

  // 5. Ensure contests
  if (!db.contests || db.contests.length === 0) {
    console.log('[EmbeddedStore] Seeding contests...');
    const now = new Date();
    const activeStart = new Date(now.getTime() - 45 * 60 * 1000).toISOString();
    const activeEnd = new Date(now.getTime() + 75 * 60 * 1000).toISOString();
    const upcomingStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const upcomingEnd = new Date(new Date(upcomingStart).getTime() + 120 * 60 * 1000).toISOString();
    const pastStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const pastEnd = new Date(new Date(pastStart).getTime() + 120 * 60 * 1000).toISOString();

    const p0 = db.problems[0]?._id;
    const p1 = db.problems[1]?._id || p0;
    const p2 = db.problems[2]?._id || p0;
    const p3 = db.problems[3]?._id || p0;
    const p4 = db.problems[4]?._id || p0;

    const uAlex = db.users.find((u) => u.email === 'alex@arena.dev') || db.users[0];
    const uSarah = db.users.find((u) => u.email === 'sarah@arena.dev') || db.users[0];

    db.contests = [
      {
        _id: generateId(),
        title: 'ByteBlitz Speed Challenge 2026',
        description: 'High-intensity 2-hour algorithmic showdown testing dynamic programming, graph traversal, and two-pointer optimizations.',
        startTime: activeStart,
        endTime: activeEnd,
        problems: [
          { problem: p0, points: 100, order: 1 },
          { problem: p3, points: 200, order: 2 },
          { problem: p4, points: 300, order: 3 }
        ],
        registeredUsers: [
          { user: uAlex._id },
          { user: uSarah._id }
        ],
        scoreboard: [
          {
            user: uAlex._id,
            username: uAlex.name,
            avatar: uAlex.profile?.avatar,
            score: 600,
            penaltyTime: 42,
            rank: 1,
            problemStats: [
              { problem: p0, solved: true, wrongAttempts: 0, pointsAwarded: 100 },
              { problem: p3, solved: true, wrongAttempts: 1, pointsAwarded: 200 },
              { problem: p4, solved: true, wrongAttempts: 0, pointsAwarded: 300 }
            ]
          },
          {
            user: uSarah._id,
            username: uSarah.name,
            avatar: uSarah.profile?.avatar,
            score: 300,
            penaltyTime: 38,
            rank: 2,
            problemStats: [
              { problem: p0, solved: true, wrongAttempts: 0, pointsAwarded: 100 },
              { problem: p3, solved: true, wrongAttempts: 0, pointsAwarded: 200 }
            ]
          }
        ]
      },
      {
        _id: generateId(),
        title: 'Weekly Arena Grand Prix #48',
        description: 'Our flagship weekly tournament featuring four progressively challenging problems. Climb the global rankings!',
        startTime: upcomingStart,
        endTime: upcomingEnd,
        problems: [
          { problem: p1, points: 100, order: 1 },
          { problem: p2, points: 200, order: 2 },
          { problem: p4, points: 300, order: 3 }
        ],
        registeredUsers: [
          { user: uAlex._id },
          { user: uSarah._id }
        ],
        scoreboard: []
      }
    ];
  }

  persistDB();
  console.log(
    `[EmbeddedStore] Database ready (${db.users.length} users, ${db.problems.length} problems, ${db.contests.length} contests, ${db.assessmentQuestions.length} questions)`
  );
  isInitialized = true;
  return db;
};

// Access raw state for admin database introspection
export const getRawDatabase = () => {
  initEmbeddedStore();
  return {
    meta: {
      location: DB_PATH,
      persistedAt: new Date().toISOString(),
      counts: {
        users: db.users.length,
        problems: db.problems.length,
        submissions: db.submissions.length,
        contests: db.contests.length,
        skillProfiles: db.skillProfiles.length,
        assessmentQuestions: db.assessmentQuestions.length
      }
    },
    collections: {
      users: db.users.map((u) => ({ ...u, password: '•••••••• (Hashed bcrypt)' })),
      skillProfiles: db.skillProfiles,
      problems: db.problems,
      submissions: db.submissions,
      contests: db.contests,
      assessmentQuestions: db.assessmentQuestions
    }
  };
};
