/**
 * Jyotiraj Panda — Portfolio Backend Server
 * Node.js + Express.js REST API
 */
const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { connectDB, getDBStatus } = require('./config/db');

// Route Imports
const profileRoutes = require('./routes/profileRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allows inline scripts & Google fonts in local dev
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve Static Frontend Assets (Unified deployment support)
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API Health Check & Info Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Jyotiraj Panda Portfolio API',
    version: '1.0.0',
    databaseConnected: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// Mount REST API Routes
app.use('/api/profile', profileRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/contact', contactRoutes);

// Catch-all route to serve frontend index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON format in request body' });
  }
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
// Connect to MongoDB
connectDB();

// Export Express app for Vercel
module.exports = app;

// Start local server only when running locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n======================================================`);
        console.log(`🚀 Jyotiraj Panda Portfolio Server is running!`);
        console.log(`📍 Local URL: http://localhost:${PORT}`);
        console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
        console.log(`======================================================\n`);
    });
}