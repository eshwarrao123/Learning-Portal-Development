import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes     from './routes/authRoutes.js';
import videoRoutes    from './routes/videoRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

const app  = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ── Core middleware ──────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/videos',    videoRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/progress',  progressRoutes);

// Health check
app.get('/api/health', (_req, res) =>
  res.json({ success: true, message: 'Server is running', data: null })
);

// ── Centralized error handler (must be last) ─────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`[server] Running on http://localhost:${PORT} — NODE_ENV=${process.env.NODE_ENV}`);
});
