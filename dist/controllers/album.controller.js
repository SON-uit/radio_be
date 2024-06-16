"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const albums_model_1 = __importDefault(require("../models/albums.model"));
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
const cloudinaryConnection_1 = require("../config/cloudinaryConnection");
class AlbumController {
    constructor() {
        this.convertFile = (file) => {
            const fileName = file.originalname.split(".")[0];
            const filePath = file.path;
            return {
                fileName,
                filePath
            };
        };
        this.createNewAlbum = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, tracks, genres, description } = req.body;
            let urlImage = "";
            if (req.file) {
                const convertImage = this.convertFile(req.file);
                const uploadedImage = yield (0, cloudinaryConnection_1.uploadImage)(convertImage.filePath, convertImage.fileName);
                urlImage = uploadedImage.url;
            }
            console.log("Test git");
            const albumObj = {
                name: name,
                tracks: JSON.parse(tracks),
                description: description,
                genres: JSON.parse(genres),
                urlImage: urlImage
            };
            const newAlbum = yield albums_model_1.default.create(albumObj);
            return res.status(200).json({
                status: "Success",
                data: newAlbum
            });
        }));
        this.getAllAlbum = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const singers = yield albums_model_1.default.find();
            return res.status(200).json({
                status: "Success",
                data: singers
            });
        }));
        this.updateView = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { albumId } = req.params;
            if (albumId) {
                yield albums_model_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(albumId) }, { $inc: { views: 1 } });
            }
            return res.status(200).json({
                status: "Success",
                data: "Update view album successfully"
            });
        }));
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
}
module.exports = new AlbumController();
//# sourceMappingURL=album.controller.js.map