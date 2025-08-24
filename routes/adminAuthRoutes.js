import express from 'express';
import { adminRegister, adminLogin } from '../controllers/adminAuthController.js';

const router = express.Router();

// Admin registration
router.post('/register', adminRegister);

// Admin login
router.post('/login', adminLogin);

// Admin logout (clear cookie)
router.post('/logout', (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ message: 'Logged out' });
});

export default router;
