import asyncHandler from 'express-async-handler';
import Video from '../models/Video.js';

// @desc   List all videos (filterable by category)
// @route  GET /api/videos?category=React
// @access Private
const getVideos = asyncHandler(async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const videos = await Video.find(filter).sort({ order: 1, createdAt: -1 });

  res.json({ success: true, message: 'Videos retrieved', data: videos });
});

// @desc   Get single video by ID
// @route  GET /api/videos/:id
// @access Private
const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  res.json({ success: true, message: 'Video retrieved', data: video });
});

// @desc   Create new video
// @route  POST /api/videos
// @access Private/Admin
const createVideo = asyncHandler(async (req, res) => {
  const { title, description, url, thumbnail, category, duration, order } = req.body;

  const video = await Video.create({
    title,
    description,
    url,
    thumbnail,
    category,
    duration,
    order,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, message: 'Video created', data: video });
});

// @desc   Update video metadata
// @route  PUT /api/videos/:id
// @access Private/Admin
const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  res.json({ success: true, message: 'Video updated', data: video });
});

// @desc   Delete video
// @route  DELETE /api/videos/:id
// @access Private/Admin
const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  res.json({ success: true, message: 'Video deleted', data: null });
});

export { getVideos, getVideo, createVideo, updateVideo, deleteVideo };
