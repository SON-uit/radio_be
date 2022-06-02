import { Request, Response, NextFunction } from "express";

type CallbackFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

const catchAsync = (fn: CallbackFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};

export default catchAsync;
