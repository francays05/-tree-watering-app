const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authMiddleware = require('../middleware/auth');

// Get dashboard metrics
router.get('/metrics', authMiddleware, async (req, res) => {
  try {
    // Total Trees
    const trees = await pool.query('SELECT COUNT(*) as total FROM trees');
    
    // Total Visits
    const visits = await pool.query('SELECT COUNT(*) as total FROM watering_visits');
    
    // Completed vs Required Visits
    const visitStats = await pool.query(
      `SELECT 
        SUM(required_visits) as required,
        (SELECT COUNT(*) FROM watering_visits) as completed
       FROM trees`
    );

    // Overdue Trees
    const overdue = await pool.query(
      `SELECT COUNT(*) as total FROM trees 
       WHERE status = 'Overdue'`
    );

    // Visits by Ward
    const byWard = await pool.query(
      `SELECT t.ward, COUNT(v.id) as visits
       FROM trees t
       LEFT JOIN watering_visits v ON t.id = v.tree_id
       GROUP BY t.ward
       ORDER BY visits DESC`
    );

    // Visits by Company
    const byCompany = await pool.query(
      `SELECT c.name, COUNT(v.id) as visits
       FROM companies c
       LEFT JOIN watering_visits v ON c.id = v.company_id
       GROUP BY c.id, c.name
       ORDER BY visits DESC`
    );

    // Species Performance
    const speciesPerf = await pool.query(
      `SELECT t.species, COUNT(v.id) as visits, AVG(CASE WHEN c.condition = 'Good' THEN 1 ELSE 0 END) as health_rate
       FROM trees t
       LEFT JOIN watering_visits v ON t.id = v.tree_id
       GROUP BY t.species
       ORDER BY visits DESC`
    );

    res.json({
      totalTrees: trees.rows[0].total,
      totalVisits: visits.rows[0].total,
      requiredVisits: visitStats.rows[0].required || 0,
      completedVisits: visitStats.rows[0].completed || 0,
      overdueCount: overdue.rows[0].total,
      visitsByWard: byWard.rows,
      visitsByCompany: byCompany.rows,
      speciesPerformance: speciesPerf.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;