import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    watchedSeconds: {
      type: Number,
      default: 0,
      min: [0, 'Watched seconds cannot be negative'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Unique: one progress record per user per video
progressSchema.index({ user: 1, video: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
