import express, { Application } from 'express';
import { getEnvValue } from './utils/getKey';
import ExpressServer from './server';

const app = express();
const port = getEnvValue('PORT');

const expressServerInstance = new ExpressServer(
  port as number | any,
  app as Application
);

(async () => {
  expressServerInstance.startServer();
})();
