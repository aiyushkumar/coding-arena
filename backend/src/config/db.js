import mongoose from 'mongoose';
import { config } from './env.js';
import { initEmbeddedStore } from './embeddedStore.js';

let isUsingEmbedded = false;

export const connectDB = async () => {
  try {
    console.log(`[DB] Attempting connection to MongoDB at: ${config.mongoUri}`);
    
    // Quick timeout so offline environments don't hang
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 1200
    });

    console.log(`[DB] Successfully connected to live MongoDB: ${mongoose.connection.host}`);
    isUsingEmbedded = false;
  } catch (error) {
    console.warn(`[DB] Live MongoDB server unavailable (${error.message}).`);
    console.log('⚡ [DB] Activating Zero-Config Embedded JSON Database Engine...');
    
    // Disable Mongoose query buffering so operations do not hang
    mongoose.set('bufferCommands', false);
    
    // Initialize embedded JSON store with comprehensive seed data
    initEmbeddedStore();
    isUsingEmbedded = true;
    
    console.log('✅ [DB] Embedded JSON Database active (Data saved in backend/data/coding_arena_db.json)');
  }
};

export const isEmbeddedDatabase = () => isUsingEmbedded;

export const closeDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    console.log('[DB] Database closed cleanly.');
  } catch (err) {
    console.error('[DB] Error closing database:', err);
  }
};
