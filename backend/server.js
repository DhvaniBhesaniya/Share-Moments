// apps/server/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON bodies

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
