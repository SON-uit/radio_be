"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const albumSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    tracks: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Track" }],
    genres: [{ type: String }],
    description: { type: String, required: true },
    urlImage: { type: String },
    views: { type: Number },
    likes: { type: Number }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
//virtual
/* albumSchema.virtual("numOfview").get(function (this: IAlbum) {
  return this.genres.length * 10;
}); */
albumSchema.pre(/^find/, function (next) {
    this.populate({
        path: "tracks",
        select: "singers name urlTrack lyrics",
        populate: {
            path: "singers",
            select: "name like "
        }
    });
    next();
});
const Album = mongoose_1.default.model("Album", albumSchema);
exports.default = Album;
//# sourceMappingURL=albums.model.js.map