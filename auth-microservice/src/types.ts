export interface ExpressServerI {
  startServer(): Promise<any>;
  connectFitnessDBMongoDB(): Promise<any>;
}
