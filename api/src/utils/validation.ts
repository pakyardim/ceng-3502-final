import { Request } from 'express';
import { validationResult } from 'express-validator';

interface CustomError extends Error {
  statusCode?: number;
}

export const checkValidationError = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    if ('path' in firstError) {
      const message = firstError.path + ' ' + firstError.msg;
      const error = new Error(message) as CustomError;
      error.statusCode = 400;
      throw error;
    }
  }
};
