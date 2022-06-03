import mongoose, { Types } from "mongoose";

interface IAlbum {
  name: string;
  tracks: Types.ObjectId[];
  genres: string[];
  description: string;
  urlImage: string;
  view?: number;
  like?: number;
}

const albumSchema = new mongoose.Schema<IAlbum>(
  {
    name: { type: String, required: true },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    genres: [{ type: String }],
    description: { type: String, required: true },
    urlImage: { type: String },
    view: { type: Number },
    like: { type: Number }
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
