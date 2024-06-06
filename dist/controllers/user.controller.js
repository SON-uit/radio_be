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
const users_mode_1 = __importDefault(require("../models/users.mode"));
const albums_model_1 = __importDefault(require("../models/albums.model"));
const singers_model_1 = __importDefault(require("../models/singers.model"));
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
const appError_1 = __importDefault(require("../helpers/appError"));
class UserController {
    constructor() {
        this.getOneUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.session.user) {
                return res.status(200).json({
                    status: "Success",
                    data: req.session.user
                });
            }
        }));
        this.likeTrack = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { trackId } = req.params;
            if (req.session.user) {
                const user = req.session.user;
                const isLikeTrack = user.likeTracks && user.likeTracks.includes(new mongoose_1.default.Types.ObjectId(trackId));
                const option = isLikeTrack ? "$pull" : "$addToSet";
                const updateUserLikeTrack = yield users_mode_1.default.findOneAndUpdate({ email: user.email }, { [option]: { likeTracks: trackId } }, { new: true });
                // if (isLikeTrack) {
                //   await Track.findOneAndUpdate({ _id: trackId }, { $inc: { like: -1 } });
                // } else {
                //   await Track.findOneAndUpdate({ _id: trackId }, { $inc: { likes: 1 } });
                // }
                return res.status(200).json({
                    message: "Success",
                    data: updateUserLikeTrack
                });
            }
            else {
                next(new appError_1.default("You must login before", 403));
            }
        }));
        this.likeSinger = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { singerId } = req.params;
            const user = req.session.user;
            if (!singerId)
                throw new appError_1.default("Not have singer id", 404);
            if (user && singerId) {
                const isLikeSinger = user.likeSingers && user.likeSingers.includes(new mongoose_1.default.Types.ObjectId(singerId));
                const option = isLikeSinger ? "$pull" : "$addToSet";
                const updateUserLikeSinger = yield users_mode_1.default.findOneAndUpdate({ email: user.email }, { [option]: { likeSingers: singerId } }, { new: true });
                if (isLikeSinger) {
                    yield singers_model_1.default.findOneAndUpdate({ _id: singerId }, { $inc: { like: -1 } });
                }
                else {
                    yield singers_model_1.default.findOneAndUpdate({ _id: singerId }, { $inc: { like: 1 } });
                }
                return res.status(200).json({
                    status: "Success",
                    data: updateUserLikeSinger
                });
            }
        }));
        this.likeAlbum = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { albumId } = req.params;
            const user = req.session.user;
            if (!albumId)
                throw new appError_1.default("Not have singer id", 404);
            if (user && albumId) {
                const isLikeAlbum = user.likeAlbums && user.likeAlbums.includes(new mongoose_1.default.Types.ObjectId(albumId));
                const option = isLikeAlbum ? "$pull" : "$addToSet";
                const updateUserLikeAlbum = yield users_mode_1.default.findOneAndUpdate({ email: user.email }, { [option]: { likeAlbums: albumId } }, { new: true });
                if (isLikeAlbum) {
                    yield albums_model_1.default.findOneAndUpdate({ _id: albumId }, { $inc: { likes: -1 } });
                }
                else {
                    yield albums_model_1.default.findOneAndUpdate({ _id: albumId }, { $inc: { likes: 1 } });
                }
                return res.status(200).json({
                    status: "Success",
                    data: updateUserLikeAlbum
                });
            }
        }));
    }
}
module.exports = new UserController();
//# sourceMappingURL=user.controller.js.map