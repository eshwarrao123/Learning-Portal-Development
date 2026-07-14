import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    url: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Duration (seconds) is required'],
      min: [1, 'Duration must be at least 1 second'],
    },
    order: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

videoSchema.index({ category: 1 });
videoSchema.index({ createdBy: 1 });

const Video = mongoose.model('Video', videoSchema);
export default Video;
