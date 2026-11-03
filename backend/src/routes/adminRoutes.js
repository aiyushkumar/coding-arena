import express from 'express';
import { getDatabaseOverview } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Allow authenticated admin users to inspect database
router.get('/database', protect, authorize('admin'), getDatabaseOverview);

// Also expose public status check for admin health inspection
router.get('/ping', (req, res) => {
  res.json({ success: true, message: 'Admin API service is active' });
});

export default router;
