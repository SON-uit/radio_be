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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trackSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    singers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Singer"
        }
    ],
    lyrics: [{ type: String, required: true }],
    urlTrack: { type: String, required: true },
    urlImage: { type: String, default: "test.jpg" },
    runtime: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    genres: [{ type: String }],
    rankPoint: {
        type: Number,
        default: function () {
            if (this.views) {
                /* return Math.floor((this.likes || 1 * 5 + this.views) / 2); */
                return 5;
            }
            return 0;
        }
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
// <Query<Track,Track> if want query in hook
trackSchema.post("findOneAndUpdate", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const newRankPoint = Math.floor((doc.likes || 1 * 5 + doc.views) / 2);
        if (doc.rankPoint !== newRankPoint) {
            doc.rankPoint = newRankPoint;
            yield doc.save();
        }
    });
});
const Track = mongoose_1.default.model("Track", trackSchema);
exports.default = Track;
//# sourceMappingURL=tracks.model.js.map