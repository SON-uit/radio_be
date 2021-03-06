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
  likes: number;
  views: number;
  genres: string[];
  rankPoint?: number;
}

interface IAlbum {
  name: string;
  tracks: Types.ObjectId[];
  genres: string[];
  description: string;
  urlImage: string;
  views?: number;
  likes?: number;
}

interface ISinger {
  name: string;
  urlImage: string;
  description: string;
  like?: number;
  type: string[];
  nation: string;
}
interface IRank {
  topRank: [
    {
      name: string;
      trackId: string;
    }
  ];
  genre: string;
  date: Date;
}
export { IUser, ITrack, IAlbum, ISinger, IRank };
