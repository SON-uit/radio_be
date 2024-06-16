import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/users.mode";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";

class AuthController {
  private signToken = (id: Types.ObjectId) => {
    if (process.env.JWT_SECRET_KEY && process.env.JWT_EXPIRATION) {
      return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION
      });
    }
  };
  register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, confirmedPassword } = req.body;
    const userObj = {
      userName: username,
      password: password,
      email: email,
      confirmedPassword: confirmedPassword
    };
    console.log("hello git sau khi rest")
    const newUser = await User.create(userObj);
    const signToken = this.signToken(newUser._id);
    return res.status(200).json({
      status: "Success",
      data: {
        token: signToken,
        user: newUser
      }
    });
  });
  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please enter a email or password", 404));
    }
    let user = await User.findOne({ email: email }).select("password"); // add password to compare hash password
    if (!user || !(await user.isCorrectPassword(password))) {
      return next(new AppError("Invalid Email or Incorrect Password", 404));
    }
    user = await User.findOne({ email: email }).select("-password");
    const signToken = this.signToken(user?._id);
    return res.status(200).json({
      status: "Success",
      data: {
        token: signToken,
        user
      }
    });
  });
  checkLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization && !req.headers.authorization?.startsWith("Bearer")) {
      return next(new AppError("You must be logged in", 403));
    }
    const token = req.headers.authorization?.split("Bearer")[1].trim();
    if (process.env.JWT_SECRET_KEY && token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as jwt.JwtPayload;
      const user = await User.findOne({ _id: decoded.id });
      req.session.user = user || undefined;
    }
    next();
  });
}
export = new AuthController();
