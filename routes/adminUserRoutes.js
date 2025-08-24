import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { listUsers, addUser, editUser, deleteUser } from '../controllers/adminUserController.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateJWT, authorizeRoles('admin'));

router.get('/', listUsers); // List users
router.post('/', addUser); // Add user
router.put('/:id', editUser); // Edit user
router.delete('/:id', deleteUser); // Delete user

export default router;
