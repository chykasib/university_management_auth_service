import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidatorError = (err: Error): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [];

  if (err instanceof mongoose.Error.ValidationError) {
    Object.keys(err.errors).forEach(key => {
      const error = err.errors[key];
      errors.push({
        path: error.path,
        message: error.message,
      });
    });
  }

  const statusCode = 400;

  return {
    statusCode,
    message: 'ValidatorError',
    errormessage: errors,
  };
};

export default handleValidatorError;
