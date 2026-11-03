import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config/env.js';
import { connectDB, closeDB, isEmbeddedDatabase } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { Problem } from './models/Problem.js';
import { seedDatabase } from './data/seedData.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import judgeRoutes from './routes/judgeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false
  })
);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Body parser
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Logging
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Global API rate limiter
app.use('/api', generalLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: isEmbeddedDatabase()
      ? 'Embedded JSON Database'
      : 'Live MongoDB Connection',
    environment: config.nodeEnv
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/judge', judgeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);

// Serve static frontend build if dist directory exists
const possiblePaths = [
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), '../frontend/dist'),
  path.resolve(process.cwd(), 'dist')
];
const staticPath = possiblePaths.find((p) => p && fs.existsSync(p));

if (staticPath) {
  console.log(`[Server] Serving static frontend build from: ${staticPath}`);
  app.use(express.static(staticPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(staticPath, 'index.html'));
  });
} else {
  console.warn('[Server] No static frontend build found. Running in API-only mode.');
}

// Catch 404 & Centralized Error Handler
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();

    // If connected to live MongoDB, check if seed is needed
    if (mongoose.connection.readyState === 1) {
      const problemCount = await Problem.countDocuments();
      if (problemCount === 0) {
        console.log('[Server] MongoDB is empty. Running initial seed data...');
        await seedDatabase();
      } else {
        console.log(`[Server] Live MongoDB contains ${problemCount} problems.`);
      }
    }

    const server = app.listen(config.port, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 Coding Arena Server running on port ${config.port}`);
      console.log(`🌐 API Base URL: http://localhost:${config.port}/api`);
      console.log(`🧪 Health Check: http://localhost:${config.port}/api/health`);
      console.log(`📊 Admin Database: http://localhost:${config.port}/api/admin/database`);
      console.log(`======================================================\n`);
    });

    // Handle termination signals
    const gracefulShutdown = async (signal) => {
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await closeDB();
        console.log('[Server] Process exited cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (err) {
    console.error('[Server] Fatal error starting server:', err);
    process.exit(1);
  }
};

startServer();

export default app;
