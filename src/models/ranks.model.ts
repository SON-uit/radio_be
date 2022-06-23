import mongoose from "mongoose";
import { IRank } from "../types/types.interface";

const rankSchema = new mongoose.Schema<IRank>({
  topRank: [
    {
      name: { type: String },
      trackId: { type: String }
    }
  ],
  genre: { type: String },
  date: { type: Date }
});

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;
