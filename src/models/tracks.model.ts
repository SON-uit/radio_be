import { Mode } from "fs";
import mongoose, { Types, Query, Model, Document } from "mongoose";

import { ITrack } from "../types/types.interface";

interface ITrackDocument extends ITrack, Document {}
interface ITrackModel extends Model<ITrackDocument> {
  updateRankPoint: () => Promise<ITrackDocument>;
}
const trackSchema = new mongoose.Schema<ITrackDocument>(
  {
    name: { type: String, required: true },
    singers: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
      default: function (this: ITrack): number {
        if (this.views) {
          /* return Math.floor((this.likes || 1 * 5 + this.views) / 2); */
          return 5;
        }
        return 0;
      }
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// <Query<Track,Track> if want query in hook
trackSchema.post<Query<ITrack, ITrack>>("findOneAndUpdate", async function (doc) {
  const newRankPoint = Math.floor((doc.likes || 1 * 5 + doc.views) / 2);
  if (doc.rankPoint !== newRankPoint) {
    doc.rankPoint = newRankPoint;
    await doc.save();
  }
});
const Track = mongoose.model<ITrackDocument, ITrackModel>("Track", trackSchema);

export default Track;
