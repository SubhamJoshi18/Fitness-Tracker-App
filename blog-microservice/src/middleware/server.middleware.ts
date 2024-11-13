import express from 'express';
import morgan from 'morgan';
import type, { Application } from 'express';

export const serverMiddleware = (expressApplication: Application) => {
  expressApplication.use(express.json());
  expressApplication.use(express.urlencoded({ extended: true }));
  expressApplication.use(morgan('dev'));
};
