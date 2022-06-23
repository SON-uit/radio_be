import Rank from "../models/ranks.model";
import catchAsync from "../helpers/catchAsync";
import { Request, Response, NextFunction } from "express";
class rankController {
  getTrackRankByDate = catchAsync(async (req: Request, res: Response) => {
    const { genre } = req.body;
    console.log(genre);
    const result = await Rank.find({
      // can't not use $and in date
      date: {
        $lte: new Date(Date.now()), //to
        $gte: new Date(Date.now() - 60 * 60 * 24 * 1000) //from yesterday
      }
    });
    return res.status(200).send({
      message: "success",
      data: result
    });
  });
}

export = new rankController();
