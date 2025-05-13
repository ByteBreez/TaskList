// routes/auth.js
const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'Session destruction failed' });
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // True in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

// Ensure /auth/user requires authentication
router.get('/user', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json(req.user);
});

module.exports = router;