// src/middleware/errorHandler.ts

import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof CustomError) {
    // Handle custom errors with specific responses
    res.status(400).json({ message: error.message });
  } else {
    // Handle other errors with a generic response
    res.status(500).json({ message: 'Internal server error' });
  }
}
