import mongoose from 'mongoose';
import fitnessLogger from '../libs/logger';

export const connectToFitnessDB = async () => {
  let retryCount = 0;
  const connection = await mongoose.connect(
    'mongodb://localhost:27017/fitnessDB'
  );

  mongoose.connection.on('connected', (connection) => {
    fitnessLogger.info(`MongoDB is Connected Successfully ${connection.name}`);
  });

  mongoose.connection.on('disconnected', () => {
    fitnessLogger.info(`MongoDB is Disconnected Successfully`);
  });

  mongoose.connection.on('error', (err) => {
    if (err) {
      fitnessLogger.error('An Error Occur while connecting to the MongoDb');

      while (retryCount > 0) {
        connectToFitnessDB();
        retryCount -= 1;
      }
    }
  });
};
