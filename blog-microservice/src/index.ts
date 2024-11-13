import express, { Application } from 'express';
import dotenv from 'dotenv';
import fitnessLogger from './libs/logger';
import { serverRouter } from './routes/server.route';
import { serverMiddleware } from './middleware/server.middleware';
import { connectToFitnessDB } from './database/connect';
dotenv.config();

const app = express();
const port = process.env.PORT;

serverMiddleware(app as Application);
serverRouter(app as Application);


connectToFitnessDB().then(() => {
  app
    .listen(port, () => {
      fitnessLogger.info(`Blog Server is running on ${port}`);
    })
    .on('error', (err) => {
      fitnessLogger.error(`Error starting the Blog Server : ${err}`);
    });
});
