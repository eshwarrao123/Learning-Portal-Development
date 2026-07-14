import express from 'express';
import {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
} from '../controllers/videoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getVideos)
  .post(protect, adminOnly, createVideo);

router.route('/:id')
  .get(protect, getVideo)
  .put(protect, adminOnly, updateVideo)
  .delete(protect, adminOnly, deleteVideo);

export default router;
