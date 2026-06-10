const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Setup multer for file uploads
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Get all visits
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM watering_visits ORDER BY visit_datetime DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get visits for a specific tree
router.get('/tree/:treeId', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM watering_visits WHERE tree_id = $1 ORDER BY visit_datetime DESC',
      [req.params.treeId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new visit with photo upload
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { tree_id, condition, recommendation, notes } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO watering_visits (tree_id, visit_datetime, user_id, company_id, condition, recommendation, notes, photo_url)
       VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [tree_id, req.user.userId, req.user.companyId, condition, recommendation, notes, photo_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;