import pool from '../db.js';

// List all users (with pagination)
export async function listUsers(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
    const [countRows] = await pool.query('SELECT COUNT(*) as count FROM users');
    return res.json({
      users,
      total: countRows[0].count,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Add a new user (admin only)
export async function addUser(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);
    return res.status(201).json({ message: 'User added successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Edit user (admin only)
export async function editUser(req, res) {
  const { id } = req.params;
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await pool.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id]);
    return res.json({ message: 'User updated successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Delete user (admin only)
export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
