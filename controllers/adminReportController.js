import pool from '../db.js';

// User-wise performance report
export async function userPerformanceReport(req, res) {
  const { user_id } = req.query;
  try {
    let query = `SELECT u.id as user_id, u.name, u.email, s.name as skill, qa.score, qa.started_at, qa.ended_at
      FROM quiz_attempts qa
      JOIN users u ON qa.user_id = u.id
      JOIN skills s ON qa.skill_id = s.id`;
    let params = [];
    if (user_id) {
      query += ' WHERE u.id = ?';
      params.push(user_id);
    }
    query += ' ORDER BY qa.started_at DESC';
    const [rows] = await pool.query(query, params);
    return res.json({ attempts: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Skill gap analysis (average scores per skill)
export async function skillGapAnalysis(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT s.id as skill_id, s.name as skill, AVG(qa.score) as avg_score, COUNT(qa.id) as attempts
      FROM skills s
      LEFT JOIN quiz_attempts qa ON qa.skill_id = s.id
      GROUP BY s.id, s.name
    `);
    return res.json({ skills: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Time-based reports (week/month filters)
export async function timeBasedReport(req, res) {
  const { period = 'week' } = req.query;
  let dateFormat;
  if (period === 'month') {
    dateFormat = '%Y-%m';
  } else {
    dateFormat = '%x-%v';
  }
  try {
    const [rows] = await pool.query(`
      SELECT DATE_FORMAT(qa.started_at, ?) as period, COUNT(qa.id) as attempts, AVG(qa.score) as avg_score
      FROM quiz_attempts qa
      GROUP BY DATE_FORMAT(qa.started_at, ?)
      ORDER BY period DESC
    `, [dateFormat, dateFormat]);
    return res.json({ periods: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
