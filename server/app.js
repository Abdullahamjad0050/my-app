const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const connectUserDB = require('./config/db').connectUserDB;
const connectSongDB = require('./config/db').connectSongDB;

dotenv.config();
connectUserDB();
connectSongDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/SongRoutes');

const PORT = process.env.PORT || 5000;


// Routes
app.use('/api/auth', authRoutes);     // Login, Create Account (User DB)
app.use('/song', songRoutes);        // Song CRUD (Song DB)

// Connect to both databases before starting server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();
