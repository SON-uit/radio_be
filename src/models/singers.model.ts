import mongoose from 'mongoose';

interface ISinger {
  name: string;
  urlImage: string;
  description: string;
  like?: number;
  type: string[];
  nation: string;
}

const singerSchema = new mongoose.Schema<ISinger>(
  {
    name: { type: String, required: true },
    urlImage: { type: String, required: true },
    description: { type: String, required: true },
    like: { type: Number },
    type: [{ type: String, required: true }],
    nation: { type: String, required: true }
  },
  { timestamps: true }
);

const Singer = mongoose.model('Singer', singerSchema);

export default Singer;
