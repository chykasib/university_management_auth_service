/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidatorError from '../../errors/handleValidatorError';
import ApiError from '../../errors/apiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('GlobalErrorHandler', err)
    : errorlogger.error('GlobalErrorHandler', err);

  let statusCode = 500;
  let message = "'something went wrong !";
  let errormessage: IGenericErrorMessage[] = [];

  next();
  if (err?.name === 'ValidatorError') {
    const simplifiedError = handleValidatorError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errormessage = simplifiedError.errormessage;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errormessage = simplifiedError.errormessage);
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errormessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errormessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errormessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
