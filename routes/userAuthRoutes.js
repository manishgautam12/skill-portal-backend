import express from 'express';
import { userRegister, userLogin } from '../controllers/userAuthController.js';

const router = express.Router();

// User registration
router.post('/register', userRegister);

// User login
router.post('/login', userLogin);

// User logout (clear cookie)
router.post('/logout', (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ message: 'Logged out' });
});

// Session check (returns user info if authenticated)
import jwt from 'jsonwebtoken';
router.get('/session', (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.json({ user: null });
	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ user });
	} catch {
		res.json({ user: null });
	}
});

export default router;
