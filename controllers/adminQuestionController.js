import pool from '../db.js';

// List all questions (with pagination and optional skill filter)
export async function listQuestions(req, res) {
  const { page = 1, limit = 10, skill_id } = req.query;
  const offset = (page - 1) * limit;
  try {
    let query = 'SELECT q.id, q.skill_id, s.name as skill_name, q.question, q.options, q.correct_answer FROM questions q JOIN skills s ON q.skill_id = s.id';
    let params = [];
    if (skill_id) {
      query += ' WHERE q.skill_id = ?';
      params.push(skill_id);
    }
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    const [questions] = await pool.query(query, params);
    const [countRows] = await pool.query('SELECT COUNT(*) as count FROM questions' + (skill_id ? ' WHERE skill_id = ?' : ''), skill_id ? [skill_id] : []);
    return res.json({
      questions,
      total: countRows[0].count,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Add a new question
export async function addQuestion(req, res) {
  const { skill_id, question, options, correct_answer } = req.body;
  if (!skill_id || !question || !options || !correct_answer) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await pool.query(
      'INSERT INTO questions (skill_id, question, options, correct_answer) VALUES (?, ?, ?, ?)',
      [skill_id, question, JSON.stringify(options), correct_answer]
    );
    return res.status(201).json({ message: 'Question added successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Edit question
export async function editQuestion(req, res) {
  const { id } = req.params;
  const { skill_id, question, options, correct_answer } = req.body;
  if (!skill_id || !question || !options || !correct_answer) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await pool.query(
      'UPDATE questions SET skill_id = ?, question = ?, options = ?, correct_answer = ? WHERE id = ?',
      [skill_id, question, JSON.stringify(options), correct_answer, id]
    );
    return res.json({ message: 'Question updated successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Delete question
export async function deleteQuestion(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM questions WHERE id = ?', [id]);
    return res.json({ message: 'Question deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
