import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { getQuizQuestions, submitQuizAttempt } from '../controllers/userQuizController.js';

const router = express.Router();

// All routes require user authentication
router.use(authenticateJWT, authorizeRoles('user'));

router.get('/questions', getQuizQuestions); // Get quiz questions by skill
router.post('/submit', submitQuizAttempt); // Submit quiz attempt

export default router;
