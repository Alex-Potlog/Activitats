import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

mongoose.set('sanitizeFilter', true);
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGO_DOCKER_PORT}/${process.env.MONGODB_DB}?authSource=admin`;

    const conn = await mongoose.connect(url);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
