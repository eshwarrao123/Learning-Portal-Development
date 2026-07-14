/**
 * Seed script — run from server/ directory:
 *   node scripts/seed.js
 *
 * Requires a .env file in server/ with MONGO_URI set.
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve .env relative to THIS file (server/.env), regardless of CWD
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ── Inline minimal schemas (avoids model registration conflicts) ─────────────
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['student', 'admin'], default: 'student' },
  avatar:   { type: String, default: '' },
}, { timestamps: true });

const videoSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  url:         { type: String, required: true },
  thumbnail:   { type: String, default: '' },
  category:    { type: String, required: true },
  duration:    { type: Number, required: true },
  order:       { type: Number, default: 0 },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const User  = mongoose.model('User',  userSchema);
const Video = mongoose.model('Video', videoSchema);

// ── Connect ──────────────────────────────────────────────────────────────────
await mongoose.connect(process.env.MONGO_URI);
console.info('[seed] Connected to MongoDB');

// ── Clear ────────────────────────────────────────────────────────────────────
await Promise.all([User.deleteMany({}), Video.deleteMany({})]);
console.info('[seed] Cleared users and videos');

// ── Demo users ───────────────────────────────────────────────────────────────
const passwordHash  = await bcrypt.hash('password123', 10);
const adminHash     = await bcrypt.hash('admin123', 10);

const [student, admin] = await User.insertMany([
  {
    name:     'Demo Student',
    email:    'student@gvcc.com',
    password: passwordHash,
    role:     'student',
  },
  {
    name:     'Admin User',
    email:    'admin@gvcc.com',
    password: adminHash,
    role:     'admin',
  },
]);

console.info(`[seed] Created users: ${student.email}, ${admin.email}`);

// ── Sample videos ────────────────────────────────────────────────────────────
await Video.insertMany([
  {
    title:       'JavaScript Fundamentals: Variables, Scope & Closures',
    description: 'A deep dive into how JavaScript handles variable declarations with var, let, and const. We explore lexical scope, the scope chain, and closures with real-world examples you can apply immediately.',
    url:         'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=480&q=80',
    category:    'JavaScript',
    duration:    600,
    order:       1,
    createdBy:   admin._id,
  },
  {
    title:       'React 18 Hooks in Depth: useState, useEffect & Custom Hooks',
    description: 'Master the React hooks API from scratch. This lesson covers useState batching in React 18, the correct dependency array patterns for useEffect, and how to extract reusable logic into custom hooks with real portfolio examples.',
    url:         'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:   'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=480&q=80',
    category:    'React',
    duration:    1200,
    order:       2,
    createdBy:   admin._id,
  },
  {
    title:       'Building RESTful APIs with Express.js & Mongoose',
    description: 'Learn to design and implement a production-ready REST API using Express.js with ES modules. Topics include route organisation, controller patterns, Mongoose schema design with validation, and centralised error handling middleware.',
    url:         'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&q=80',
    category:    'Node.js',
    duration:    1800,
    order:       3,
    createdBy:   admin._id,
  },
  {
    title:       'MongoDB Aggregation Pipeline: From Zero to Production',
    description: 'Go beyond simple CRUD queries and harness the power of MongoDB\'s aggregation pipeline. This lesson covers $match, $group, $lookup (joins), $project, and $sort stages with hands-on examples on a real dataset.',
    url:         'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:   'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=480&q=80',
    category:    'MongoDB',
    duration:    2400,
    order:       4,
    createdBy:   admin._id,
  },
]);

console.info('[seed] Created 4 sample videos');
console.info('\n✅  Seed complete!\n');
console.info('  Student login → email: student@gvcc.com  | password: password123');
console.info('  Admin login   → email: admin@gvcc.com    | password: admin123\n');

await mongoose.disconnect();
process.exit(0);
