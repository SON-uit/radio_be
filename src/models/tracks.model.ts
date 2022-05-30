import mongoose from 'mongoose';

interface ITrack {
  name: string;
  singers: string[];
  urlTrack: string;
  urlImage: string;
  runtime: number;
  likes?: number;
  views?: number;
}
const trackSchema = new mongoose.Schema<ITrack>(
  {
    name: { type: String, required: true },
    singers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Singer'
      }
    ],
    urlTrack: { type: String, required: true },
    urlImage: { type: String, required: true },
    runtime: { type: Number, required: true },
    likes: { type: Number },
    views: { type: Number }
  },
  { timestamps: true }
);

const Track = mongoose.model('Track', trackSchema);

export default Track;
