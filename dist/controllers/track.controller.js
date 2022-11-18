"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tracks_model_1 = __importDefault(require("../models/tracks.model"));
const cloudinary = __importStar(require("../config/cloudinaryConnection"));
const crawlerLyric_1 = __importDefault(require("../tools/crawlerLyric"));
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
const APIFeatures_1 = __importDefault(require("../helpers/APIFeatures"));
class TrackController {
    constructor() {
        this.convertFile = (file) => {
            const fileName = file.originalname.split(".")[0];
            const filePath = file.path;
            return {
                fileName,
                filePath
            };
        };
        this.createNewTrack = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, runtime, linkLyric, singers } = req.body;
            const lyrics = yield (0, crawlerLyric_1.default)(linkLyric);
            if (req.files) {
                const files = req.files; // set for upload.fields
                const trackAudio = files.trackAudio[0];
                const trackImage = files.trackImage[0];
                const convertAudio = this.convertFile(trackAudio);
                const convertImage = this.convertFile(trackImage);
                const uploadAudio = yield cloudinary.uploadAudio(convertAudio.filePath, convertAudio.fileName);
                const uploadImage = yield cloudinary.uploadImage(convertImage.filePath, convertImage.fileName);
                const trackObject = {
                    name: name,
                    urlTrack: uploadAudio.url,
                    urlImage: uploadImage.url,
                    runtime: runtime * 1,
                    lyrics: lyrics,
                    singers: JSON.parse(singers)
                };
                const newTrack = yield tracks_model_1.default.create(trackObject);
                return res.status(201).json({
                    status: "Success",
                    data: newTrack
                });
            }
        }));
        this.getAllTrack = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("alltrack");
            const queryData = new APIFeatures_1.default(tracks_model_1.default.find().populate({ path: "singers", select: { _id: 1, name: 1 } }), req.query)
                .filter()
                .search()
                .fields()
                .sort();
            const allTrack = yield queryData.query;
            if (allTrack) {
                return res.status(200).json({
                    status: "Success",
                    length: allTrack.length,
                    data: allTrack
                });
            }
        }));
        this.uploadView = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield tracks_model_1.default.findOneAndUpdate({ _id: req.params.trackId }, { $inc: { views: 1 } }); // add 1 every this line exec
            return res.status(200).send({
                message: "success",
                data: "Successfully Upload View"
            });
        }));
        this.uploadGeners = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { genres } = req.body;
            yield tracks_model_1.default.updateOne({ _id: req.params.trackId }, { $set: { genres: genres } });
            return res.status(200).send({
                message: "success",
                data: "Successfully Upload Geners"
            });
        }));
    }
}
module.exports = new TrackController();
//# sourceMappingURL=track.controller.js.map