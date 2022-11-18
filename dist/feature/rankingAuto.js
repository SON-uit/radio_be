"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingJob = void 0;
const cron_1 = require("cron");
const tracks_model_1 = __importDefault(require("../models/tracks.model"));
/* import dbConnect from "../config/mongoDbConnection";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const connectMongoDB = new dbConnect(process.env.DB_USER || "", process.env.DB_PASSWORD || ""); */
function rankingTop5TrackByGenders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield tracks_model_1.default.aggregate([
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
                        topRank: { $slice: ["$tracks", 5] },
                        genre: "$_id"
                    }
                },
                {
                    $addFields: {
                        date: { $toDate: new Date(Date.now()).toISOString() }
                    }
                },
                {
                    $merge: {
                        // insert document to new collection
                        into: "ranks"
                    }
                }
            ]);
        }
        catch (e) {
            console.log("Error");
        }
    });
}
const rankingJob = new cron_1.CronJob("*/15 * * * * *", // run at 00:00:00
function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ranking Start");
        yield rankingTop5TrackByGenders();
    });
}, null, true, "Asia/Ho_Chi_Minh");
exports.rankingJob = rankingJob;
//# sourceMappingURL=rankingAuto.js.map