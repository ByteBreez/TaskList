const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    res.redirect('http://localhost:5173/role-selection');
  }
);

router.post('/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { role: role === 'admin' ? 'admin' : 'guest' },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get('/logout', (req, res) => {
  console.log('Logout route hit');
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ message: 'Session destruction failed' });
      }
      console.log('Session destroyed, clearing cookie');
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
      });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;