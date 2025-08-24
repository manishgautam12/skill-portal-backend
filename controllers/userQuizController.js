import pool from '../db.js';

// Fetch questions for a quiz by skill
export async function getQuizQuestions(req, res) {
  const { skill_id } = req.query;
  if (!skill_id) {
    return res.status(400).json({ message: 'Skill ID is required.' });
  }
  try {
    const [questions] = await pool.query(
      'SELECT id, question, options FROM questions WHERE skill_id = ?',
      [skill_id]
    );
    // Parse options JSON for each question, fallback to comma-split if invalid
    const formatted = questions.map(q => {
      let opts;
      try {
        opts = JSON.parse(q.options);
      } catch {
        if (typeof q.options === 'string') {
          opts = q.options.split(',').map(s => s.trim()).filter(Boolean);
        } else if (Array.isArray(q.options)) {
          opts = q.options;
        } else {
          opts = [];
        }
      }
      return { ...q, options: opts };
    });
    return res.json({ questions: formatted });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Submit quiz attempt and answers
export async function submitQuizAttempt(req, res) {
  const userId = req.user.id;
  const { skill_id, answers } = req.body;
  if (!skill_id || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: 'Skill ID and answers are required.' });
  }
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const startedAt = new Date();
    // Insert quiz_attempts
    const [attemptResult] = await conn.query(
      'INSERT INTO quiz_attempts (user_id, skill_id, score, started_at, ended_at) VALUES (?, ?, ?, ?, ?)',
      [userId, skill_id, 0, startedAt, startedAt]
    );
    const attemptId = attemptResult.insertId;
    let score = 0;
    for (const ans of answers) {
      const [qRows] = await conn.query('SELECT correct_answer FROM questions WHERE id = ?', [ans.question_id]);
      if (qRows.length === 0) continue;
      const isCorrect = qRows[0].correct_answer === ans.selected_answer;
      if (isCorrect) score++;
      await conn.query(
        'INSERT INTO quiz_answers (attempt_id, question_id, selected_answer, is_correct) VALUES (?, ?, ?, ?)',
        [attemptId, ans.question_id, ans.selected_answer, isCorrect]
      );
    }
    // Update score and ended_at
    const endedAt = new Date();
    await conn.query('UPDATE quiz_attempts SET score = ?, ended_at = ? WHERE id = ?', [score, endedAt, attemptId]);
    await conn.commit();
    return res.status(201).json({ message: 'Quiz submitted successfully.', score });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    conn.release();
  }
}
