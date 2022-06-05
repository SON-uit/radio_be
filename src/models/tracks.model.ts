import mongoose, { Types } from "mongoose";

import { ITrack } from "../types/types.interface";

const trackSchema = new mongoose.Schema<ITrack>(
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
    likes: { type: Number },
    views: { type: Number }
  },
  { timestamps: true }
);

const Track = mongoose.model("Track", trackSchema);

export default Track;
