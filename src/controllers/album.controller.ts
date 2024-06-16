import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Album from "../models/albums.model";
import catchAsync from "../helpers/catchAsync";
import { uploadImage } from "../config/cloudinaryConnection";

interface ConvertFile {
  fileName: string;
  filePath: string;
}
class AlbumController {
  convertFile = (file: Express.Multer.File): ConvertFile => {
    const fileName = file.originalname.split(".")[0];
    const filePath = file.path;
    return {
      fileName,
      filePath
    };
  };
  createNewAlbum = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, tracks, genres, description } = req.body;
    let urlImage: string = "";
    if (req.file) {
      const convertImage = this.convertFile(req.file);
      const uploadedImage = await uploadImage(convertImage.filePath, convertImage.fileName);
      urlImage = uploadedImage.url;
    }
    const albumObj = {
      name: name,
      tracks: JSON.parse(tracks),
      description: description,
      genres: JSON.parse(genres),
      urlImage: urlImage
    };
    const newAlbum = await Album.create(albumObj);
    return res.status(200).json({
      status: "Success",
      data: newAlbum
    });
  });
  getAllAlbum = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const singers = await Album.find();
    return res.status(200).json({
      status: "Success",
      data: singers
    });
  });
  updateView = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { albumId } = req.params;
    if (albumId) {
      await Album.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(albumId) },
        { $inc: { views: 1 } }
      );
    }
    return res.status(200).json({
      status: "Success",
      data: "Update view album successfully"
    });
  });
  /*  getAllAlbumofSinger = catchAsync(async (req: Request, res: Response,next: NextFunction) => {
    const singerId= await Album.aggregate([
      {$lookup: {
        
      }}
    ])
    return res.status(200).json({
      status: "Success",
      data: albums
    })
  }) */
}

export = new AlbumController();
