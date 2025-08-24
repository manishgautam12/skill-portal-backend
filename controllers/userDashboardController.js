import pool from '../db.js';

// List available skills for quiz selection
export async function listAvailableSkills(req, res) {
  try {
    const [skills] = await pool.query('SELECT id, name FROM skills');
    return res.json({ skills });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// List user's past quiz attempts (summary)
export async function userQuizHistory(req, res) {
  const userId = req.user.id;
  try {
    const [attempts] = await pool.query(
      `SELECT qa.id, s.name as skill, qa.score, qa.started_at, qa.ended_at
       FROM quiz_attempts qa
       JOIN skills s ON qa.skill_id = s.id
       WHERE qa.user_id = ?
       ORDER BY qa.started_at DESC`,
      [userId]
    );
    return res.json({ attempts });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
