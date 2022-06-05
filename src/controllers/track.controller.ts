import mongoose from "mongoose";
import Track from "../models/tracks.model";
import * as cloudinary from "../config/cloudinaryConnection";
import crawlerLyric from "../tools/crawlerLyric";
import { Request, Response, NextFunction } from "express";
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
  createNewTrack = async (req: Request, res: Response) => {
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
  };
  async getAllTrack(req: Request, res: Response) {
    const allTrack = await Track.find().populate({ path: "singers", select: { _id: 1, name: 1 } });
    if (allTrack) {
      return res.status(200).json({
        status: "Success",
        data: allTrack
      });
    }
  }
}

export = new TrackController();
