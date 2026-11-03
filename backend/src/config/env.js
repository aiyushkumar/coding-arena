import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coding_arena',
  jwtSecret: process.env.JWT_SECRET || 'coding_arena_super_secret_jwt_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  judgeTimeLimitMs: parseInt(process.env.JUDGE_TIME_LIMIT_MS || '3000', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
