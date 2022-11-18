import Rank from "../models/ranks.model";
import catchAsync from "../helpers/catchAsync";
import { Request, Response, NextFunction } from "express";
class rankController {
  getTrackRankByDate = catchAsync(async (req: Request, res: Response) => {
    const { genre } = req.body;
    //check if have genre in body request
    const genreOptions = genre ? genre : { $exists: true };
    const result = await Rank.aggregate([
      {
        $match: {
          date: {
            // can't not use $and in date
            $lte: new Date(Date.now()), //to
            $gte: new Date(Date.now() - 2 * 60 * 60 * 24 * 1000) //from yesterday
          },
          genre: genreOptions
        }
      },
      {
        $group: {
          _id: "$date",
          results: { $push: { genre: "$genre", topRank: "$topRank" } }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          results: 1
        }
      }
    ]);
    return res.status(200).send({
      message: "success",
      length: result.length,
      data: result
    });
  });
}

export = new rankController();
