import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { listQuestions, addQuestion, editQuestion, deleteQuestion } from '../controllers/adminQuestionController.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateJWT, authorizeRoles('admin'));

router.get('/', listQuestions); // List questions
router.post('/', addQuestion); // Add question
router.put('/:id', editQuestion); // Edit question
router.delete('/:id', deleteQuestion); // Delete question

export default router;
