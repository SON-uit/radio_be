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
interface Time {
  timestamps: boolean;
}
const userSchema = new mongoose.Schema<IUser, Time>(
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

const User = mongoose.model<IUser>('User', userSchema);

export default User;
