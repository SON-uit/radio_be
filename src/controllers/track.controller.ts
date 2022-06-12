import mongoose from "mongoose";
import Track from "../models/tracks.model";
import * as cloudinary from "../config/cloudinaryConnection";
import crawlerLyric from "../tools/crawlerLyric";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../helpers/catchAsync";
import APIFeatures from "../helpers/APIFeatures";
interface ConvertFile {
  fileName: string;
  filePath: string;
}

class TrackController {
  convertFile = (file: Express.Multer.File): ConvertFile => {
    const fileName = file.originalname.split(".")[0];
    const filePath = file.path;
    return {
      fileName,
      filePath
    };
  };
  createNewTrack = catchAsync(async (req: Request, res: Response) => {
    const { name, runtime, linkLyric, singers } = req.body;

    const lyrics = await crawlerLyric(linkLyric);
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // set for upload.fields
      const trackAudio = files.trackAudio[0];
      const trackImage = files.trackImage[0];

      const convertAudio = this.convertFile(trackAudio);
      const convertImage = this.convertFile(trackImage);

      const uploadAudio = await cloudinary.uploadAudio(
        convertAudio.filePath,
        convertAudio.fileName
      );
      const uploadImage = await cloudinary.uploadImage(
        convertImage.filePath,
        convertImage.fileName
      );

      const trackObject = {
        name: name,
        urlTrack: uploadAudio.url,
        urlImage: uploadImage.url,
        runtime: runtime * 1,
        lyrics: lyrics,
        singers: JSON.parse(singers)
      };
      const newTrack = await Track.create(trackObject);
      return res.status(201).json({
        status: "Success",
        data: newTrack
      });
    }
  });
  getAllTrack = catchAsync(async (req: Request, res: Response) => {
    const queryData = new APIFeatures(
      Track.find().populate({ path: "singers", select: { _id: 1, name: 1 } }),
      req.query
    )
      .filter()
      .search()
      .fields()
      .sort();
    const allTrack = await queryData.query;
    if (allTrack) {
      return res.status(200).json({
        status: "Success",
        length: allTrack.length,
        data: allTrack
      });
    }
  });
  uploadView = catchAsync(async (req: Request, res: Response) => {
    await Track.findOneAndUpdate({ _id: req.params.trackId }, { $inc: { views: 1 } }); // add 1 every this line exec
    return res.status(200).send({
      message: "success",
      data: "Successfully Upload View"
    });
  });
  uploadGeners = catchAsync(async (req: Request, res: Response) => {
    const { genres } = req.body;
    await Track.updateOne({ _id: req.params.trackId }, { $set: { genres: genres } });
    return res.status(200).send({
      message: "success",
      data: "Successfully Upload Geners"
    });
  });
  getTop5Track = catchAsync(async (req: Request, res: Response) => {
    const result = await Track.aggregate([
      //pipeline,
      { $unwind: "$genres" },
      {
        $group: {
          _id: "$genres",
          tracks: { $push: { name: "$name", view: "$views", rankPoint: "$rankPoint" } }
        }
      },
      { $addFields: { genre: "$_id" } },
      { $unwind: "$tracks" },
      { $sort: { "tracks.rankPoint": -1 } },
      {
        $group: {
          _id: "$genre",
          tracks: {
            $push: { name: "$tracks.name", view: "$tracks.views", rankPoint: "$tracks.rankPoint" }
          }
        }
      },
      {
        $project: {
          _id: 0,
          top5: { $slice: ["$tracks", 5] }, // max number of elements returned from the start of the array
          genres: "$_id"
        }
      }
    ]);
    return res.status(200).send({
      message: "success",
      data: result
    });
  });
}

export = new TrackController();
