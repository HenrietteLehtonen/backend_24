import {validationResult} from 'express-validator';

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    // return res.status(400).json({errors: errors.array()});
    console.log(errors.array());
    const errorString = errors.array().map((item) => item.path + ' ');
    // TODO: yhdistä 'paths'
    return next(customError(`Validation erros: ${errorString}`, 400));
  }
  next();
};

// custom error handler

const customError = (message, status) => {
  const error = new Error(message);
  error.status = status || 500;
  return error;
};

// kun sivustoa ei löydy, käsitellään tällä funkttiolla
// 404 virheille
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  return next(error); // passataan error handlerille next!
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export {notFoundHandler, errorHandler, customError, validationErrorHandler};
