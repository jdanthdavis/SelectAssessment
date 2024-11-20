require('dotenv').config();
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI;

/**
 * Connects to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
