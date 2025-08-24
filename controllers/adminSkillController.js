import pool from '../db.js';

// List all skills (with pagination)
export async function listSkills(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const [skills] = await pool.query('SELECT id, name FROM skills LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
    const [countRows] = await pool.query('SELECT COUNT(*) as count FROM skills');
    return res.json({
      skills,
      total: countRows[0].count,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Add a new skill
export async function addSkill(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Skill name is required.' });
  }
  try {
    const [rows] = await pool.query('SELECT id FROM skills WHERE name = ?', [name]);
    if (rows.length > 0) {
      return res.status(409).json({ message: 'Skill already exists.' });
    }
    await pool.query('INSERT INTO skills (name) VALUES (?)', [name]);
    return res.status(201).json({ message: 'Skill added successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Edit skill
export async function editSkill(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Skill name is required.' });
  }
  try {
    await pool.query('UPDATE skills SET name = ? WHERE id = ?', [name, id]);
    return res.json({ message: 'Skill updated successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Delete skill
export async function deleteSkill(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM skills WHERE id = ?', [id]);
    return res.json({ message: 'Skill deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
