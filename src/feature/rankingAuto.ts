import { CronJob } from "cron";
import Track from "../models/tracks.model";
/* import dbConnect from "../config/mongoDbConnection";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const connectMongoDB = new dbConnect(process.env.DB_USER || "", process.env.DB_PASSWORD || ""); */
async function rankingTop5TrackByGenders() {
  try {
    await Track.aggregate([
      //pipeline,
      { $unwind: "$genres" },
      {
        $group: {
          _id: "$genres",
          tracks: { $push: { trackId: "$_id", name: "$name", rankPoint: "$rankPoint" } }
        }
      },
      { $addFields: { genre: "$_id" } },
      { $unwind: "$tracks" },
      { $sort: { "tracks.rankPoint": -1 } },
      {
        $group: {
          _id: "$genre",
          tracks: {
            $push: {
              name: "$tracks.name",
              trackId: "$tracks.trackId"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          top5: { $slice: ["$tracks", 5] }, // max number of elements returned from the start of the array
          genres: "$_id"
        }
      },
      {
        $addFields: {
          date: { $toDate: new Date(Date.now()).toISOString() }
        }
      },
      {
        $group: {
          _id: "$date",
          rank: {
            $push: { top5: "$top5", genres: "$genres" }
          }
        }
      },
      {
        $project: {
          _id: 0,
          rank: 1,
          date: "$_id"
        }
      },
      {
        $merge: {
          // insert document to new collection
          into: "ranks"
        }
      }
    ]);
  } catch (e) {
    console.log("Error");
  }
}
const rankingJob = new CronJob(
  "*0 0  * * *", // run at 00:00:00
  async function () {
    console.log("Ranking Start");
    await rankingTop5TrackByGenders();
  },
  null,
  true,
  "Asia/Ho_Chi_Minh"
);
export { rankingJob };
