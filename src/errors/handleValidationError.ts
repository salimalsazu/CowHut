import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrrorResponse } from '../interface/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
