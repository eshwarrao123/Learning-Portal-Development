import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
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
    // Position in the video where the bookmark was placed (seconds)
    timestamp: {
      type: Number,
      required: [true, 'Timestamp (seconds) is required'],
      min: [0, 'Timestamp cannot be negative'],
    },
    // Optional user-provided label
    name: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

// Non-unique — multiple bookmarks per video per user are intentional
bookmarkSchema.index({ user: 1, video: 1, timestamp: 1 });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
