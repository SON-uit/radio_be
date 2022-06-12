import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import User from "../models/users.mode";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";
import Track from "../models/tracks.model";
class UserController {
  getOneUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
      return res.status(200).json({
        status: "Success",
        data: req.session.user
      });
    }
  });
  likeTrack = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { trackId } = req.params;
    if (req.session.user) {
      const user = req.session.user;
      const isLikeTrack =
        user.likeTracks && user.likeTracks.includes(new mongoose.Types.ObjectId(trackId));
      const option = isLikeTrack ? "$pull" : "$addToSet";
      const updateUserLikeTracks = await User.findOneAndUpdate(
        { email: user.email },
        { [option]: { likeTracks: trackId } },
        { new: true }
      );
      if (isLikeTrack) {
        await Track.findOneAndUpdate({ _id: trackId }, { $inc: { like: -1 } });
      } else {
        await Track.findOneAndUpdate({ _id: trackId }, { $inc: { likes: 1 } });
      }
      return res.status(200).json({
        message: "Success",
        data: updateUserLikeTracks
      });
    } else {
      next(new AppError("You must login before", 403));
    }
  });
}

export = new UserController();
