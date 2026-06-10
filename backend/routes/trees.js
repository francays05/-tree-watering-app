const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get all trees
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM trees ORDER BY tree_id'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single tree by TreeID
router.get('/:treeId', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM trees WHERE tree_id = $1',
      [req.params.treeId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new tree
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { tree_id, ward, ward_prefix, species, cultivar, road_site_name, planting_date, required_visits, status, latitude, longitude } = req.body;

    const result = await pool.query(
      `INSERT INTO trees (tree_id, ward, ward_prefix, species, cultivar, road_site_name, planting_date, required_visits, status, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [tree_id, ward, ward_prefix, species, cultivar, road_site_name, planting_date, required_visits, status, latitude, longitude]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tree status
router.patch('/:treeId', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE trees SET status = $1, updated_at = NOW() WHERE tree_id = $2 RETURNING *',
      [status, req.params.treeId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;