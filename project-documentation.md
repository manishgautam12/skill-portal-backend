# Skill Assessment Portal - Complete Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Components](#frontend-components)
9. [Authentication & Authorization](#authentication--authorization)
10. [Features](#features)
11. [Development Guidelines](#development-guidelines)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## Project Overview

The **Skill Assessment Portal** is a full-stack web application designed to evaluate and track user skills through interactive quizzes. The platform supports both users and administrators with role-based access control.

### Key Objectives
- Provide skill assessment through interactive quizzes
- Track user performance and progress over time
- Enable administrators to manage skills, questions, and generate reports
- Offer secure authentication and authorization
- Deliver responsive and intuitive user experience

### Target Audience
- **End Users**: Individuals seeking to assess their skills
- **Administrators**: System managers who oversee content and generate reports
- **Organizations**: Companies looking to evaluate employee skills

---

## Architecture

### System Architecture
The application follows a modern **3-tier architecture**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MySQL)       │
│   Port: 5173    │    │   Port: 5000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Authentication Flow
```
User Login → JWT Cookie → Protected Routes → API Access → Database Operations
```

### Data Flow
1. **User Interaction**: Frontend React components handle user input
2. **API Communication**: Axios makes HTTP requests to backend
3. **Authentication**: JWT tokens in httpOnly cookies for security
4. **Business Logic**: Express controllers process requests
5. **Data Persistence**: MySQL database stores and retrieves data
6. **Response**: JSON responses sent back to frontend

---

## Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM/Query Builder**: mysql2 (native MySQL driver)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **CORS**: cors middleware
- **Cookie Parsing**: cookie-parser

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Chart.js + react-chartjs-2
- **Styling**: CSS3 + Custom stylesheets

### Development Tools
- **Module System**: ES Modules (ESM)
- **Package Manager**: npm
- **Process Manager**: nodemon (development)
- **Version Control**: Git

---

## Project Structure

```
skill-assessment-portal/
├── backend/
│   ├── controllers/           # Business logic handlers
│   │   ├── adminAuthController.js
│   │   ├── userAuthController.js
│   │   ├── adminReportController.js
│   │   ├── userDashboardController.js
│   │   ├── userQuizController.js
│   │   ├── skillManagementController.js
│   │   ├── questionManagementController.js
│   │   └── userManagementController.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js           # JWT authentication middleware
│   ├── routes/               # API route definitions
│   │   ├── adminAuthRoutes.js
│   │   ├── userAuthRoutes.js
│   │   ├── adminReportRoutes.js
│   │   ├── userDashboardRoutes.js
│   │   ├── userQuizRoutes.js
│   │   ├── skillManagementRoutes.js
│   │   ├── questionManagementRoutes.js
│   │   └── userManagementRoutes.js
│   ├── db.js                 # Database connection
│   ├── migrate.js            # Database migration script
│   ├── index.js              # Server entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── SkillManagement.jsx
│   │   │   ├── QuestionManagement.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── Reports.jsx
│   │   ├── pages/            # Main page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   └── HomePage.jsx
│   │   ├── services/         # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── userDashboardService.js
│   │   ├── context/          # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useLogout.js
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # Frontend dependencies
├── project-setup-guide.md    # Initial setup documentation
├── stepwise-implementation-plan.md
├── logout.md                 # Logout functionality docs
├── logout-implementation-plan.md
└── README.md                 # Project overview
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL Server (v8.0 or higher)
- npm (comes with Node.js)

### Step-by-Step Installation

#### 1. Clone/Setup Project
```bash
# Navigate to project directory
cd C:\Users\acer\Desktop\ppppp

# Verify project structure
ls -la
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Or create .env manually with:
```

**Environment Variables (.env)**:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=quizeportal
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

#### 3. Database Setup
```bash
# Create MySQL database
mysql -u root -p

# In MySQL shell:
CREATE DATABASE quizeportal;
USE quizeportal;

# Exit MySQL
EXIT;

# Run migration script (creates tables)
node migrate.js
```

#### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

#### 5. Start Development Servers

**Terminal 1 (Backend)**:
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm run dev
# Server running on http://localhost:5173
```

### Verification
- Backend API: http://localhost:5000
- Frontend App: http://localhost:5173
- Test API: http://localhost:5000/api/user/auth/session

---

## Database Schema

### Tables Overview

#### 1. `users`
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. `admins`
```sql
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. `skills`
```sql
CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. `questions`
```sql
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  skill_id INT NOT NULL,
  question_text TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer VARCHAR(255) NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
```

#### 5. `quiz_attempts`
```sql
CREATE TABLE quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  skill_id INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
```

### Database Relationships
- **Users** ↔ **Quiz Attempts**: One-to-Many
- **Skills** ↔ **Questions**: One-to-Many  
- **Skills** ↔ **Quiz Attempts**: One-to-Many

---

## API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **API Prefix**: `/api`

### Authentication
- **Type**: JWT (JSON Web Token)
- **Storage**: httpOnly cookies
- **Header**: Cookies sent automatically
- **Expiry**: 24 hours

### API Endpoints

#### User Authentication
- **POST** `/api/user/auth/register` — User registration
- **POST** `/api/user/auth/login` — User login
- **POST** `/api/user/auth/logout` — User logout
- **GET** `/api/user/auth/session` — Check session status

#### Admin Authentication
- **POST** `/api/admin/auth/register` — Admin registration
- **POST** `/api/admin/auth/login` — Admin login
- **POST** `/api/admin/auth/logout` — Admin logout
- **GET** `/api/admin/auth/session` — Check admin session

#### User Dashboard
- **GET** `/api/user/dashboard/skills` — Get available skills
- **GET** `/api/user/dashboard/history` — Get quiz history

#### Quiz System
- **GET** `/api/user/quiz/questions?skill_id=1` — Get quiz questions
- **POST** `/api/user/quiz/submit` — Submit quiz answers

#### Admin Reports
- **GET** `/api/admin/reports/user-performance` — User performance data
- **GET** `/api/admin/reports/skill-gap` — Skill gap analysis
- **GET** `/api/admin/reports/time-based?period=month` — Time-based reports

#### Admin Management
- **GET/POST/PUT/DELETE** `/api/admin/skills` — Skill management
- **GET/POST/PUT/DELETE** `/api/admin/questions` — Question management
- **GET/PUT/DELETE** `/api/admin/users` — User management

### Example API Responses

#### Successful Login
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Quiz Questions
```json
{
  "questions": [
    {
      "id": 1,
      "question_text": "What is React?",
      "options": ["Library", "Framework", "Language", "Tool"],
      "difficulty": "easy"
    }
  ]
}
```

#### Error Response
```json
{
  "message": "Validation error",
  "error": "Email is required"
}
```

---

## Frontend Components

### Pages

#### `LoginPage.jsx`
- **Purpose**: User/Admin authentication
- **Features**: Role selection, form validation, error handling
- **Navigation**: Redirects to appropriate dashboard after login

#### `UserDashboard.jsx`
- **Purpose**: User's main interface
- **Features**: Available skills, quiz history, skill selection
- **API Calls**: Fetches skills and history data

#### `AdminDashboard.jsx`
- **Purpose**: Admin management interface
- **Features**: Tabbed interface for different admin functions
- **Sections**: User Management, Skill Management, Questions, Reports

#### `QuizPage.jsx`
- **Purpose**: Interactive quiz interface
- **Features**: Question display, answer selection, progress tracking
- **Functionality**: Timer, scoring, result display

### Components

#### `Navbar.jsx`
- **Purpose**: Navigation and authentication status
- **Features**: Dynamic button visibility based on auth state
- **Functionality**: Login/Logout, role-based navigation

#### `SkillManagement.jsx`
- **Purpose**: CRUD operations for skills
- **Features**: Add, edit, delete skills
- **UI**: Table display with action buttons

#### `Reports.jsx`
- **Purpose**: Display analytics and reports
- **Features**: Charts, data visualization, filtering
- **Libraries**: Chart.js for graphs

### Services

#### `api.js`
- **Purpose**: Centralized API client
- **Configuration**: Base URL, request/response interceptors
- **Features**: Automatic cookie handling, error handling

#### `authService.js`
- **Purpose**: Authentication helper functions
- **Functions**: `isAuthenticated()`, `isAdmin()`, `isUser()`
- **Implementation**: Async functions using session endpoint

### Context

#### `AuthContext.jsx`
- **Purpose**: Global authentication state management
- **Features**: Auth status, user data, update functions
- **Benefits**: Real-time UI updates, centralized auth state

---

## Authentication & Authorization

### Authentication Flow

#### 1. User Registration/Login
```javascript
// Frontend sends credentials
POST /api/user/auth/login
{
  "email": "user@example.com", 
  "password": "password123"
}

// Backend validates and responds
{
  "message": "Login successful",
  "user": { "id": 1, "role": "user" }
}
// + Sets httpOnly cookie with JWT
```

#### 2. Subsequent Requests
```javascript
// Frontend automatically sends cookie
GET /api/user/dashboard/skills
Cookie: token=jwt_token_here

// Backend validates JWT in middleware
// Adds user info to req.user
// Processes protected route
```

#### 3. Logout
```javascript
// Frontend calls logout
POST /api/user/auth/logout

// Backend clears cookie
// Returns success response
```

### Security Features

#### JWT Implementation
- **Storage**: httpOnly cookies (XSS protection)
- **Expiry**: 24 hours
- **Secret**: Environment variable
- **Claims**: userId, role, expiration

#### Password Security
- **Hashing**: bcryptjs with salt rounds (10)
- **Validation**: Minimum length requirements
- **Storage**: Never stored in plain text

#### CORS Configuration
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Allow cookies
}));
```

#### Protected Routes
- **Middleware**: `authenticateJWT` for all protected routes
- **Authorization**: `authorizeAdmin` for admin-only routes
- **Session Validation**: Real-time session checking

### Role-Based Access Control

#### User Role (`user`)
- ✅ Access own dashboard
- ✅ Take quizzes  
- ✅ View own history
- ❌ Admin functions

#### Admin Role (`admin`)
- ✅ All user permissions
- ✅ Manage skills and questions
- ✅ View all user data
- ✅ Generate reports
- ✅ User management

---

## Features

### User Features

#### 1. **Skill Assessment**
- Browse available skills
- Take interactive quizzes
- Receive immediate scoring
- Track performance over time

#### 2. **Dashboard**
- Personal performance metrics
- Quiz history with timestamps
- Skill progress tracking
- Quick access to new assessments

#### 3. **Authentication**
- Secure registration and login
- Session persistence
- Automatic logout handling
- Password security

### Admin Features

#### 1. **Content Management**
- **Skills**: Add, edit, delete skill categories
- **Questions**: Manage quiz questions and answers
- **Validation**: Ensure data integrity

#### 2. **User Management**
- View all registered users
- Monitor user activity
- Manage user permissions
- Delete inactive accounts

#### 3. **Analytics & Reports**
- **User Performance**: Individual and aggregate metrics
- **Skill Gap Analysis**: Identify areas needing focus
- **Time-Based Reports**: Trends over weeks/months
- **Visual Charts**: Interactive data visualization

#### 4. **System Administration**
- Role-based access control
- Data export capabilities
- System monitoring
- Security management

### Technical Features

#### 1. **Real-Time Updates**
- Instant UI updates on auth changes
- Dynamic navbar based on user state
- Immediate feedback on actions

#### 2. **Responsive Design**
- Mobile-friendly interface
- Adaptive layouts
- Cross-browser compatibility

#### 3. **Error Handling**
- Comprehensive error messages
- Graceful failure handling
- User-friendly error display

#### 4. **Performance**
- Optimized database queries
- Efficient state management
- Fast page loads

---

## Development Guidelines

### Code Standards

#### Backend (Node.js)
```javascript
// Use ES modules
import express from 'express';

// Async/await for database operations
export async function getUserById(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json({ user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Consistent error handling
if (!email) {
  return res.status(400).json({ message: 'Email is required' });
}
```

#### Frontend (React)
```javascript
// Functional components with hooks
function Dashboard() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []); // Proper dependency arrays
  
  return <div>{/* JSX */}</div>;
}

// Consistent naming
const handleSubmit = async (e) => {
  e.preventDefault();
  // Handle form submission
};
```

### File Organization
- **Controllers**: Business logic only
- **Routes**: Route definitions and middleware
- **Services**: Reusable API functions
- **Components**: UI components with single responsibility
- **Utils**: Helper functions and utilities

### Database Best Practices
- **Prepared Statements**: Always use parameterized queries
- **Transactions**: Use for multi-step operations
- **Indexing**: Add indexes for frequently queried columns
- **Validation**: Validate data before database operations

### Security Guidelines
- **Input Validation**: Validate all user inputs
- **SQL Injection**: Use parameterized queries
- **XSS Protection**: Sanitize output data
- **Authentication**: Verify user identity for protected routes
- **Authorization**: Check user permissions for actions

---

## Deployment

### Production Environment Setup

#### Backend Deployment
```bash
# Environment variables for production
NODE_ENV=production
PORT=5000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=quizeportal_prod
JWT_SECRET=your_strong_jwt_secret

# Install production dependencies
npm ci --only=production

# Start with PM2 (process manager)
npm install -g pm2
pm2 start index.js --name skill-portal-backend
```

#### Frontend Deployment
```bash
# Build for production
npm run build

# Serve static files (nginx/apache)
# Point to /dist directory
```

#### Database Migration
```bash
# Run migration on production database
node migrate.js

# Backup before deployment
mysqldump -u root -p quizeportal_prod > backup.sql
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] SSL certificates installed
- [ ] CORS configured for production domains
- [ ] Security headers implemented
- [ ] Error logging configured
- [ ] Monitoring tools setup
- [ ] Backup procedures established

---

## Troubleshooting

### Common Issues

#### 1. **CORS Errors**
```
Access to XMLHttpRequest at 'http://localhost:5000' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution**: Verify CORS configuration in backend
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### 2. **Database Connection Failed**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solutions**:
- Check if MySQL is running: `mysql -u root -p`
- Verify connection details in `.env`
- Check firewall settings
- Restart MySQL service

#### 3. **JWT Token Issues**
```
Error: Invalid token / Token expired
```
**Solutions**:
- Check JWT_SECRET in environment
- Verify cookie configuration
- Clear browser cookies
- Check token expiration logic

#### 4. **Frontend Build Errors**
```
Module not found / Import errors
```
**Solutions**:
- Check import paths (case-sensitive)
- Verify file extensions (.jsx vs .js)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

#### 5. **Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solutions**:
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <process_id> /F

# Or use different port
PORT=5001 npm run dev
```

### Debug Mode

#### Backend Debugging
```bash
# Enable debug logging
DEBUG=* npm run dev

# Or specific modules
DEBUG=express:* npm run dev
```

#### Frontend Debugging
```javascript
// Enable development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Browser developer tools
// Network tab for API calls
// Console for JavaScript errors
// React Developer Tools extension
```

### Performance Issues

#### Database Optimization
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_quiz_attempts_user_skill ON quiz_attempts(user_id, skill_id);

-- Analyze slow queries
SHOW PROCESSLIST;
EXPLAIN SELECT * FROM quiz_attempts WHERE user_id = 1;
```

#### Frontend Optimization
```javascript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Optimize useEffect dependencies
useEffect(() => {
  fetchData();
}, [dependency]); // Avoid unnecessary re-renders
```

### Logs and Monitoring

#### Backend Logs
```javascript
// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Error logging
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
});
```

#### Database Monitoring
```sql
-- Monitor active connections
SHOW STATUS LIKE 'Threads_connected';

-- Check table sizes
SELECT table_name, data_length, index_length 
FROM information_schema.tables 
WHERE table_schema = 'quizeportal';
```

---

## Contact & Support

### Development Team
- **Backend Developer**: Node.js, Express, MySQL expertise
- **Frontend Developer**: React, JavaScript, UI/UX
- **DevOps**: Deployment, monitoring, security

### Resources
- **Project Repository**: Local development environment
- **Documentation**: This file and related markdown docs
- **Issue Tracking**: Track bugs and feature requests locally
- **Code Reviews**: Peer review process for quality assurance

### Getting Help
1. **Check Documentation**: Review this guide and API docs
2. **Debug Logs**: Check console output and error messages
3. **Search Issues**: Look for similar problems in troubleshooting
4. **Test Isolation**: Reproduce issues in minimal environment
5. **Stack Overflow**: Search for Node.js, React, MySQL solutions

---
