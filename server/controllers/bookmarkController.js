import asyncHandler from 'express-async-handler';
import Bookmark from '../models/Bookmark.js';

// @desc   Create a bookmark at a specific timestamp
// @route  POST /api/bookmarks
// @access Private
const createBookmark = asyncHandler(async (req, res) => {
  const { videoId, timestamp, name } = req.body;

  if (timestamp === undefined || timestamp === null) {
    res.status(400);
    throw new Error('timestamp (seconds) is required');
  }

  const bookmark = await Bookmark.create({
    user: req.user._id,
    video: videoId,
    timestamp,
    name: name || '',
  });

  res.status(201).json({ success: true, message: 'Bookmark created', data: bookmark });
});

// @desc   Get bookmarks — optionally filtered by videoId
// @route  GET /api/bookmarks?videoId=xxx
// @access Private
const getBookmarks = asyncHandler(async (req, res) => {
  const filter = { user: req.user._id };
  if (req.query.videoId) filter.video = req.query.videoId;

  const bookmarks = await Bookmark.find(filter)
    .populate('video', 'title thumbnail duration')
    .sort({ timestamp: 1 });

  res.json({ success: true, message: 'Bookmarks retrieved', data: bookmarks });
});

// @desc   Edit bookmark name or timestamp
// @route  PUT /api/bookmarks/:id
// @access Private
const updateBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
  if (!bookmark) {
    res.status(404);
    throw new Error('Bookmark not found');
  }

  const { name, timestamp } = req.body;
  if (name !== undefined) bookmark.name = name;
  if (timestamp !== undefined) bookmark.timestamp = timestamp;
  await bookmark.save();

  res.json({ success: true, message: 'Bookmark updated', data: bookmark });
});

// @desc   Delete a specific bookmark
// @route  DELETE /api/bookmarks/:id
// @access Private
const deleteBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!bookmark) {
    res.status(404);
    throw new Error('Bookmark not found');
  }
  res.json({ success: true, message: 'Bookmark deleted', data: null });
});

export { createBookmark, getBookmarks, updateBookmark, deleteBookmark };
