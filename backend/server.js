// apps/server/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDatabase = require('./config/database');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const fs = require('fs');

// Load env vars
dotenv.config();

// Connect to database
connectDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/photos', require('./routes/photoRoutes'));

app.get("/", (req, res) => {
  res.send("Hello from Share Movements API!");
});

// Mock login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Simple dummy check
  if (email === "test@example.com" && password === "password123") {
    res.status(200).json({ message: "Login successful...", user: { email } });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
