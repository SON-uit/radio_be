import mongoose from "mongoose";

import { ISinger } from "../types/types.interface";

const singerSchema = new mongoose.Schema<ISinger>(
  {
    name: { type: String, required: true },
    urlImage: { type: String, required: true },
    description: { type: String, required: true },
    like: { type: Number, default: 0 },
    type: [{ type: String, required: true }],
    nation: { type: String, required: true }
  },
  { timestamps: true }
);

const Singer = mongoose.model("Singer", singerSchema);

export default Singer;
