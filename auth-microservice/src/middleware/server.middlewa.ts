import type, { Application } from 'express';
import express from 'express';
import morgan from 'morgan';

export const ServerMiddleware = (expressApplication: Application) => {
  expressApplication.use(express.json());
  expressApplication.use(express.urlencoded({ extended: true }));
  expressApplication.use(morgan('dev'));
};
