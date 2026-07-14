import asyncHandler from 'express-async-handler';
import Progress from '../models/Progress.js';
import Video from '../models/Video.js';

// @desc   Get all progress records for current user
// @route  GET /api/progress
// @access Private
const getAllProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.find({ user: req.user._id })
    .populate('video', 'title thumbnail duration category')
    .sort({ lastWatchedAt: -1 });

  res.json({ success: true, message: 'Progress retrieved', data: progress });
});

// @desc   Continue-watching list — in-progress videos sorted by lastWatchedAt DESC
// @route  GET /api/progress/continue
// @access Private
const getContinueWatching = asyncHandler(async (req, res) => {
  const progress = await Progress.find({
    user: req.user._id,
    completed: false,
    watchedSeconds: { $gt: 0 },
  })
    .populate('video', 'title thumbnail duration category')
    .sort({ lastWatchedAt: -1 });

  res.json({ success: true, message: 'Continue watching retrieved', data: progress });
});

// @desc   Get progress for a specific video
// @route  GET /api/progress/:videoId
// @access Private
const getVideoProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user._id,
    video: req.params.videoId,
  });

  res.json({
    success: true,
    message: 'Video progress retrieved',
    data: progress || { watchedSeconds: 0, completed: false },
  });
});

// @desc   Upsert progress — marks completed at ≥90% watched
// @route  POST /api/progress/:videoId
// @access Private
const upsertProgress = asyncHandler(async (req, res) => {
  const { watchedSeconds } = req.body;

  const video = await Video.findById(req.params.videoId);
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }

  const completed = watchedSeconds >= video.duration * 0.9;

  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id, video: req.params.videoId },
    { watchedSeconds, completed, lastWatchedAt: new Date() },
    { new: true, upsert: true, runValidators: true }
  );

  res.json({ success: true, message: 'Progress updated', data: progress });
});

export { getAllProgress, getContinueWatching, getVideoProgress, upsertProgress };
