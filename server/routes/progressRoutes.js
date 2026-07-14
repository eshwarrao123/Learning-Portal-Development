import express from 'express';
import {
  getAllProgress,
  getContinueWatching,
  getVideoProgress,
  upsertProgress,
} from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// IMPORTANT: /continue must be declared before /:videoId to avoid route shadowing
router.get('/', protect, getAllProgress);
router.get('/continue', protect, getContinueWatching);
router.get('/:videoId', protect, getVideoProgress);
router.post('/:videoId', protect, upsertProgress);

export default router;
