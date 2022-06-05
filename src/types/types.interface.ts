import { Types } from "mongoose";
interface IUser {
  userName: string;
  email: string;
  password: string;
  confirmedPassword?: string;
  isActive?: boolean;
  role?: string;
  image: string;
  likeTracks?: Types.ObjectId[];
  likeSingers?: Types.ObjectId[];
  likeAlbums?: Types.ObjectId[];
}
interface ITrack {
  name: string;
  singers: Types.ObjectId[];
  urlTrack: string;
  urlImage: string;
  lyrics: string[];
  runtime: number;
  likes?: number;
  views?: number;
}

interface IAlbum {
  name: string;
  tracks: Types.ObjectId[];
  genres: string[];
  description: string;
  urlImage: string;
  view?: number;
  like?: number;
}

interface ISinger {
  name: string;
  urlImage: string;
  description: string;
  like?: number;
  type: string[];
  nation: string;
}

export { IUser, ITrack, IAlbum, ISinger };
