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
const singers_model_1 = __importDefault(require("../models/singers.model"));
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
const cloudinaryConnection_1 = require("../config/cloudinaryConnection");
const APIFeatures_1 = __importDefault(require("../helpers/APIFeatures"));
const albums_model_1 = __importDefault(require("../models/albums.model"));
class SingerController {
    constructor() {
        this.convertFile = (file) => {
            const fileName = file.originalname.split(".")[0];
            const filePath = file.path;
            return {
                fileName,
                filePath
            };
        };
        this.createNewSinger = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, description, type, nation } = req.body;
            let urlImage = "";
            if (req.file) {
                const convertImage = this.convertFile(req.file);
                const uploadedImage = yield (0, cloudinaryConnection_1.uploadImage)(convertImage.filePath, convertImage.fileName);
                urlImage = uploadedImage.url;
            }
            const singerObj = {
                name: name,
                description: description,
                type: type,
                nation: nation,
                urlImage: urlImage
            };
            const newSinger = yield singers_model_1.default.create(singerObj);
            return res.status(200).json({
                status: "Success",
                data: newSinger
            });
        }));
        this.getAllSinger = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const queryData = new APIFeatures_1.default(singers_model_1.default.find(), req.query)
                .filter()
                .search()
                .fields()
                .sort()
                .paginate();
            const singers = yield queryData.query;
            return res.status(200).json({
                status: "Success",
                data: singers
            });
        }));
        this.getSingerId = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const singer = yield singers_model_1.default.find({ _id: new mongoose_1.default.Types.ObjectId(req.params.singerId) });
            return res.status(200).json({
                status: "Success",
                data: singer
            });
        }));
        this.getAllTrackOfSinger = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //const tracks = await Track.find({ singers: { $elemMatch: { $eq: req.params.singerId } } });
            // const tracks = await Track.aggregate([
            //   {
            //     $lookup: {
            //       from: "singers",
            //       localField: "singers",
            //       foreignField: "_id",
            //       as: 'singers',
            //     }
            //   },
            //   {
            //     $match: {
            //       // covert string to object Id
            //       singers: { $elemMatch: { _id: { $eq: new mongoose.Types.ObjectId(req.params.singerId) } } }
            //       /* genres: { $elemMatch: { $eq: req.query.genres } } */
            //     }
            //   }
            // ]);
            // return res.status(200).json({
            //   status: "Success",
            //   data: tracks
            // });
            console.log("Test demmo ne 2 nè");
        }));
        this.getAllAlbumOfSinger = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //const tracks = await Track.find({ singers: { $elemMatch: { $eq: req.params.singerId } } });
            const albums = yield albums_model_1.default.aggregate([
                {
                    $lookup: {
                        from: "tracks",
                        localField: "tracks",
                        foreignField: "_id",
                        as: 'tracksFind',
                    }
                },
                {
                    $lookup: {
                        from: "singers",
                        localField: "tracksFind.singers",
                        foreignField: "_id",
                        as: "singersFind",
                    }
                },
                {
                    $match: {
                        // covert string to object Id
                        singersFind: { $elemMatch: { _id: { $eq: new mongoose_1.default.Types.ObjectId(req.params.singerId) } } }
                        /* genres: { $elemMatch: { $eq: req.query.genres } } */
                    }
                }
            ]);
            return res.status(200).json({
                status: "Success",
                data: albums
            });
        }));
    }
}
module.exports = new SingerController();
//# sourceMappingURL=singer.controller.js.map