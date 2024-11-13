import mongoose from 'mongoose';
import fitnessLogger from '../libs/logger';

const maxRetries = 5;
const retryDelay = 3000; 

export const connectToFitnessDB = async () => {
  let retryCount = maxRetries;

  const connect = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/fitnessDB');
    } catch (err) {
      fitnessLogger.error('Initial MongoDB connection failed', err);
      retryConnection();
    }
  };

  const retryConnection = () => {
    if (retryCount > 0) {
      retryCount -= 1;
      fitnessLogger.warn(
        `Retrying MongoDB connection (${
          maxRetries - retryCount
        }/${maxRetries})...`
      );
      setTimeout(() => connect(), retryDelay);
    } else {
      fitnessLogger.error('Max retries reached. Could not connect to MongoDB.');
    }
  };

  mongoose.connection.on('connected', () => {
    fitnessLogger.info('MongoDB connected successfully.');
  });

  mongoose.connection.on('disconnected', () => {
    fitnessLogger.info('MongoDB disconnected.');
  });

  mongoose.connection.on('error', (err) => {
    fitnessLogger.error('MongoDB connection error:', err);
    retryConnection();
  });

  connect();
};
