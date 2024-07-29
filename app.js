// app.js
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

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

// Routes
const authRouter = require("./routes/authRoutes");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const postsRouter = require("./routes/postRoutes"); 
const uploadRouter = require("./routes/uploadRoutes");
const saveRouter = require("./routes/saveRoutes");
const followRouter = require("./routes/followRoute")
const storyRouter = require("./routes/storyRoutes");

app.use("/", indexRouter);
app.use("/users", usersRouter); 
app.use('/auth', authRouter);
app.use("/posts", postsRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRouter);
app.use('/save', saveRouter);
app.use('/follow' , followRouter);
app.use("/stories", storyRouter);

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
