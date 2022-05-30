import mongoose from 'mongoose';

interface IUser {
  userName: string;
  email: string;
  password: string;
  image?: string;
  likeTracks?: string[];
  likeSingers?: string[];
  likeAlbums?: string[];
}
const userSchema = new mongoose.Schema<IUser>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    likeTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    likeSingers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Singer' }],
    likeAlbums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
