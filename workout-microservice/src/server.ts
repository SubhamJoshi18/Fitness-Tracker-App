import type, { Application } from 'express';
import { serverRoutes } from './routes/server.route';
import { serverMiddle } from './middleware/server.middleware';

export const serverStarter = (expressApplication: Application) => {
  serverMiddle(expressApplication as Application);
  serverRoutes(expressApplication as Application);
};

