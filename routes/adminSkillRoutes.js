import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { listSkills, addSkill, editSkill, deleteSkill } from '../controllers/adminSkillController.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateJWT, authorizeRoles('admin'));

router.get('/', listSkills); // List skills
router.post('/', addSkill); // Add skill
router.put('/:id', editSkill); // Edit skill
router.delete('/:id', deleteSkill); // Delete skill

export default router;
