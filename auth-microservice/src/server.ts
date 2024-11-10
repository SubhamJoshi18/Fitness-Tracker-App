import { ExpressServerI } from './types';
import type, { Application } from 'express';
import fitnessLogger from './libs/logger';
import { connectToFitnessDB } from './database/connect';
import ServerRouter from './routes/server.route';
import { ServerMiddleware } from './middleware/server.middlewa';

class ExpressServer implements ExpressServerI {
  private serverPort: number;
  public expressApplication: Application;

  constructor(serverPort: number, expressApplication: Application) {
    this.serverPort = serverPort;
    this.expressApplication = expressApplication;
    ServerMiddleware(this.expressApplication as Application);
    ServerRouter(this.expressApplication as Application);
  }

  public async connectFitnessDBMongoDB(): Promise<any> {
    return connectToFitnessDB();
  }

  public async startServer(): Promise<any> {
    try {
      this.connectFitnessDBMongoDB().then(() => {
        this.expressApplication
          .listen(this.serverPort, () => {
            fitnessLogger.info(
              `Auth Server is running on the ${this.serverPort} `
            );
          })
          .on('error', (err) => {
            throw err;
          });
      });
    } catch (err) {
      process.on('uncaughtException', (err) => {
        fitnessLogger.error(
          `Uncaught exception at ${process.pid} , error : ${err}`
        );
      });

      if (err instanceof Error) {
        fitnessLogger.error(
          `Error starting the Express Server Due to : ${err.message}`
        );
        process.exit(1);
      }
    }
  }
}

export default ExpressServer;
