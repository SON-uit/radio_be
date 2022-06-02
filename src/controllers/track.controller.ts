import mongoose from "mongoose";
import Track from "../models/tracks.model";
import * as cloudinary from "../config/cloudinaryConnection";
import crawlerLyric from "../tools/crawlerLyric";
import { Request, Response, NextFunction } from "express";
const urlLyrics =
  "https://www.megalobiz.com/lrc/maker/Ex%27s+Hate+Me+B+Ray%2C+Masew%2C+AMee+Karaoke+Full+beat+G%E1%BB%91c.55305551";

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
    const lyrics = await crawlerLyric(urlLyrics);
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // set for upload.fields
      const trackAudio = files.trackAudio[0];
      const trackImage = files.trackImage[0];

      const convertAudio = this.convertFile(trackAudio);
      const convertImage = this.convertFile(trackImage);

      const uploadAudio = await cloudinary.uploadAudio(convertAudio.filePath, convertAudio.fileName);
      const uploadImage = await cloudinary.uploadImage(convertImage.filePath, convertImage.fileName);

      const trackObject = {
        name: "Ex's Hate Me",
        urlTrack: uploadAudio.url,
        urlImage: uploadImage.url,
        runtime: 231,
        lyrics: lyrics
      };
      const newTrack = await Track.create(trackObject);
      return res.status(201).json({
        message: "Success",
        data: newTrack
      });
    }
  };
  async getAllTrack(req: Request, res: Response) {
    const allTrack = await Track.find();
    if (allTrack) {
      return res.status(200).json({
        message: "Success",
        data: allTrack
      });
    }
  }
}

export = new TrackController();
