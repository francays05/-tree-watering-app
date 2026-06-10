const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');

// Get all users
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, name, email, company_id, created_at FROM users'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, name, email, company_id FROM users WHERE id = $1',
      [req.user.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new user (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { username, password, name, email, company_id } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, password_hash, name, email, company_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, name, email, company_id`,
      [username, passwordHash, name, email, company_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;