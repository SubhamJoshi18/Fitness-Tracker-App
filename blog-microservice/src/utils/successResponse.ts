import type, { Response } from 'express';

export const successResponse = <T>(
  res: Response,
  message: string,
  statusCode: number,
  data: T
) => {
  return res.status(201).json({
    message: message,
    data: data,
  });
};
