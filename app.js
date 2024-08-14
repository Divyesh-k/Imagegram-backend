// app.js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const initializeSocket = require('./socket');
const http = require('http')

// Load environment variables from .env file
dotenv.config();

// Initialize socket.io
const server = http.createServer(app);
const io = initializeSocket(server);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI; // Use environment variable

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public')));


const indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
