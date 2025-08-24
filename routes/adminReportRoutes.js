import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { userPerformanceReport, skillGapAnalysis, timeBasedReport } from '../controllers/adminReportController.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticateJWT, authorizeRoles('admin'));

router.get('/user-performance', userPerformanceReport); // User-wise performance
router.get('/skill-gap', skillGapAnalysis); // Skill gap analysis
router.get('/time-based', timeBasedReport); // Time-based reports

export default router;
