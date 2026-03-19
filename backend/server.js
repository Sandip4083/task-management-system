const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors({
  origin: isProduction
    ? true  // Allow same-origin in production
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (!isProduction) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
  });
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'TMS API is running',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Serve Frontend in Production
// ============================================
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');

// Serve static files from the React/Vite build
app.use(express.static(frontendDistPath));

// For any route that is NOT an API route, serve index.html
// This enables React Router (client-side routing) to work
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.path} not found`,
    });
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: isProduction ? 'Internal server error' : err.message,
  });
});

// Start server
const startServer = async () => {
  try {
    // Sync database
    await sequelize.sync();
    console.log('✅ Database synced successfully');

    app.listen(PORT, () => {
      console.log(`🚀 TMS Backend running on port ${PORT}`);
      console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
      if (isProduction) {
        console.log('🌐 Frontend is served from /frontend/dist');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
