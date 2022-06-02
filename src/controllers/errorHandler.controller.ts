import { Request, Response, NextFunction } from "express";
/* const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      message: err.message,
    });
  }
};
const sendErrorProduct = (err, res) => {
  // Operational , trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Progaming or other unknown error : don't leak details for client
  } else {
    //1 log error
    console.error('Error', err);
    //2 send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something was wrong',
    });
  }
}; */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  /*  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res); // goi den global hanling middelware
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handlerErrorDB(err);
    if (err.code === 1000) err = handlerDuplicateDB(err);
    if (err.name === "ValidationError") err = handlerValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handlerJWTError();
    if (err.name === "TokenExpiredError") err = handlerExpiredJWTError();
    sendErrorProduct(err, res); // goi den global hanling middelware
    next();
  } */
  console.log(err);
};
export default errorHandler;
