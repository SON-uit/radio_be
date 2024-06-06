import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import User from "../models/users.mode";
import Track from "../models/tracks.model";
import Album from "../models/albums.model";
import Singer from "../models/singers.model";
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
  likeTrack = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { trackId } = req.params;
    if (req.session.user) {
      const user = req.session.user;
      const isLikeTrack =
        user.likeTracks && user.likeTracks.includes(new mongoose.Types.ObjectId(trackId));
      const option = isLikeTrack ? "$pull" : "$addToSet";
      const updateUserLikeTrack = await User.findOneAndUpdate(
        { email: user.email },
        { [option]: { likeTracks: trackId } },
        { new: true }
      );
      // if (isLikeTrack) {
      //   await Track.findOneAndUpdate({ _id: trackId }, { $inc: { like: -1 } });
      // } else {
      //   await Track.findOneAndUpdate({ _id: trackId }, { $inc: { likes: 1 } });
      // }
      return res.status(200).json({
        message: "Success",
        data: updateUserLikeTrack
      });
    } else {
      next(new AppError("You must login before", 403));
    }
  });
  likeSinger = catchAsync(async (req: Request, res: Response) => {
    const { singerId } = req.params;
    const user = req.session.user;
    if (!singerId) throw new AppError("Not have singer id", 404);
    if (user && singerId) {
      const isLikeSinger =
        user.likeSingers && user.likeSingers.includes(new mongoose.Types.ObjectId(singerId));
      const option = isLikeSinger ? "$pull" : "$addToSet";
      const updateUserLikeSinger = await User.findOneAndUpdate(
        { email: user.email },
        { [option]: { likeSingers: singerId } },
        { new: true }
      );
      if (isLikeSinger) {
        await Singer.findOneAndUpdate({ _id: singerId }, { $inc: { like: -1 } });
      } else {
        await Singer.findOneAndUpdate({ _id: singerId }, { $inc: { like: 1 } });
      }
      return res.status(200).json({
        status: "Success",
        data: updateUserLikeSinger
      });
    }
  });
  likeAlbum = catchAsync(async (req: Request, res: Response) => {
    const { albumId } = req.params;
    const user = req.session.user;
    if (!albumId) throw new AppError("Not have singer id", 404);
    if (user && albumId) {
      const isLikeAlbum =
        user.likeAlbums && user.likeAlbums.includes(new mongoose.Types.ObjectId(albumId));
      const option = isLikeAlbum ? "$pull" : "$addToSet";
      const updateUserLikeAlbum = await User.findOneAndUpdate(
        { email: user.email },
        { [option]: { likeAlbums: albumId } },
        { new: true }
      );
      if (isLikeAlbum) {
        await Album.findOneAndUpdate({ _id: albumId }, { $inc: { likes: -1 } });
      } else {
        await Album.findOneAndUpdate({ _id: albumId }, { $inc: { likes: 1 } });
      }
      return res.status(200).json({
        status: "Success",
        data: updateUserLikeAlbum
      });
    }
  });
}

export = new UserController();
