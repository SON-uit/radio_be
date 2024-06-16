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
  save(): unknown;
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
interface Demo2 {
  name:string
}

interface ITrackDocument{
name:any;
}
interface ITrackModel {
  create(trackObject: { name: any; urlTrack: string; urlImage: string; runtime: number; lyrics: string[]; singers: any; }): unknown;
  find(): unknown;
  findOneAndUpdate(arg0: { _id: string; }, arg1: { $inc: { views: number; }; }): unknown;
  updateOne(arg0: { _id: string; }, arg1: { $set: { genres: any; }; }): unknown;
name:any;
 singers:any[],
    lyrics: any,
    urlTrack: any,
    urlImage: any,
    runtime:any,
    likes: any,
    views: any,
    genres: any[],
    rankPoint: any;
}
interface Test {
  result:number;
}

interface Demo22 {
  name:string;
  value:number;
}


export { IUser, ITrack, IAlbum, ISinger, IRank,ITrackDocument,ITrackModel };
