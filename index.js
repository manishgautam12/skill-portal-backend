

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

import adminAuthRoutes from './routes/adminAuthRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import adminSkillRoutes from './routes/adminSkillRoutes.js';
import adminQuestionRoutes from './routes/adminQuestionRoutes.js';
import adminReportRoutes from './routes/adminReportRoutes.js';
import userAuthRoutes from './routes/userAuthRoutes.js';
import userDashboardRoutes from './routes/userDashboardRoutes.js';
import userQuizRoutes from './routes/userQuizRoutes.js';

app.use('/api/user/auth', userAuthRoutes);
app.use('/api/user/dashboard', userDashboardRoutes);
app.use('/api/user/quiz', userQuizRoutes);

app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/skills', adminSkillRoutes);
app.use('/api/admin/questions', adminQuestionRoutes);
app.use('/api/admin/reports', adminReportRoutes);

app.get('/', (req, res) => {
  res.send('Skill Assessment & Reporting Portal Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
