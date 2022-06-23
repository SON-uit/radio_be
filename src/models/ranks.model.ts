import mongoose from "mongoose";
import { IRank } from "../types/types.interface";

const rankSchema = new mongoose.Schema<IRank>({
  rank: [
    {
      top5: [
        {
          name: { type: String },
          rankPoint: { type: Number }
        }
      ],
      genres: { type: String }
    }
  ],
  date: { type: Date }
});

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;
