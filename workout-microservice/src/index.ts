import express, { Application } from 'express';
import { getEnvValue } from './utils/getKey';
import { serverStarter } from './server';
import fitnessLogger from './libs/logger';

const app = express();
const port = getEnvValue('PORT');

async function startWorkoutServer() {
  try {
    await serverStarter(app as Application);

    app
      .listen(port, () => {
        fitnessLogger.info(`Workout Server is starting on the ${port}`);
      })
      .on('error', (err) => {
        throw err;
      });
  } catch (err) {
    fitnessLogger.error(
      `Workout Server caught an error while starting the fitness server , Error : ${err}`
    );
  }
}

(async () => {
  await startWorkoutServer();
})();
