import mongoose from "mongoose";
import Track from "../models/tracks.model";
import * as cloudinary from "../config/cloudinaryConnection";
import crawlerLyric from "../tools/crawlerLyric";
import { Request, Response, NextFunction } from "express";
const urlLyrics =
  "https://www.megalobiz.com/lrc/maker/Ex%27s+Hate+Me+B+Ray%2C+Masew%2C+AMee+Karaoke+Full+beat+G%E1%BB%91c.55305551";
class TrackController {
  async createNewTrack(req: Request, res: Response) {
    const lyrics = await crawlerLyric(urlLyrics);
    if (req.file) {
      const fileName = req.file.originalname.split(".")[0];
      const filePath = req.file.path;
      const uploadAudio = await cloudinary.uploadAudio(filePath, fileName);
      //console.log(uploadAudio.url); // return url after upload cloudinary
      // return res.send(uploadFile);
      const object = {
        name: "Ex's Hate Me",
        urlTrack: uploadAudio.url,
        runtime: 231,
        lyrics: lyrics
      };
      const newTrack = await Track.create(object);
      return res.send(newTrack);
    }
  }
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
