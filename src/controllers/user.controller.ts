import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import User from "../models/users.mode";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";

class UserController {
  getOneUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
      return res.status(200).json({
        status: "Success",
        data: req.session.user
      });
    }
  });
}

export = new UserController();
