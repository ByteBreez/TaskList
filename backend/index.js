require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Add this
const cors = require('cors');
require('./config/passport');

const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

const app = express();

// CORS: allow our frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'https://task-list-five-beta.vercel.app',
    credentials: true,
  })
);

app.use(express.json());
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Use MongoStore
    cookie: {
      secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/form', formRoutes);

// Connect to MongoDB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
 + 1; // Increment PORT to avoid conflicts
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });