import express from 'express';
import {
  createBookmark,
  getBookmarks,
  updateBookmark,
  deleteBookmark,
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getBookmarks)
  .post(protect, createBookmark);

router.route('/:id')
  .put(protect, updateBookmark)
  .delete(protect, deleteBookmark);

export default router;
