import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { listAvailableSkills, userQuizHistory } from '../controllers/userDashboardController.js';

const router = express.Router();

// All routes require user authentication
router.use(authenticateJWT, authorizeRoles('user'));

router.get('/skills', listAvailableSkills); // List available skills
router.get('/history', userQuizHistory); // User's quiz history

export default router;
