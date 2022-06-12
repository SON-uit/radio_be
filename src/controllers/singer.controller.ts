import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Singer from "../models/singers.model";
import Track from "../models/tracks.model";
import catchAsync from "../helpers/catchAsync";
import AppError from "../helpers/appError";
import { uploadImage } from "../config/cloudinaryConnection";
import APIFeatures from "../helpers/APIFeatures";
interface ConvertFile {
  fileName: string;
  filePath: string;
}
class SingerController {
  convertFile = (file: Express.Multer.File): ConvertFile => {
    const fileName = file.originalname.split(".")[0];
    const filePath = file.path;
    return {
      fileName,
      filePath
    };
  };
  createNewSinger = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, type, nation } = req.body;
    let urlImage: string = "";
    if (req.file) {
      const convertImage = this.convertFile(req.file);
      const uploadedImage = await uploadImage(convertImage.filePath, convertImage.fileName);
      urlImage = uploadedImage.url;
    }
    const singerObj = {
      name: name,
      description: description,
      type: type,
      nation: nation,
      urlImage: urlImage
    };
    const newSinger = await Singer.create(singerObj);
    return res.status(200).json({
      status: "Success",
      data: newSinger
    });
  });
  getAllSinger = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const queryData = new APIFeatures(Singer.find(), req.query)
      .filter()
      .search()
      .fields()
      .sort()
      .paginate();
    const singers = await queryData.query;
    return res.status(200).json({
      status: "Success",
      data: singers
    });
  });
  getAllTrackOfSinger = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //const tracks = await Track.find({ singers: { $elemMatch: { $eq: req.params.singerId } } });
    const tracks = await Track.aggregate([
      {
        $match: {
          // covert string to object Id
          singers: { $elemMatch: { $eq: new mongoose.Types.ObjectId(req.params.singerId) } }
          /* genres: { $elemMatch: { $eq: req.query.genres } } */
        }
      }
    ]);
    return res.status(200).json({
      status: "Success",
      data: tracks
    });
  });
}
export = new SingerController();
