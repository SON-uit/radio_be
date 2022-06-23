import mongoose, { Types } from "mongoose";
import { IAlbum } from "../types/types.interface";

const albumSchema = new mongoose.Schema<IAlbum>(
  {
    name: { type: String, required: true },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    genres: [{ type: String }],
    description: { type: String, required: true },
    urlImage: { type: String },
    views: { type: Number },
    likes: { type: Number }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//virtual
/* albumSchema.virtual("numOfview").get(function (this: IAlbum) {
  return this.genres.length * 10;
}); */
albumSchema.pre(/^find/, function (next): void {
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
const Album = mongoose.model("Album", albumSchema);

export default Album;
