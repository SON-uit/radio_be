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
const ranks_model_1 = __importDefault(require("../models/ranks.model"));
const catchAsync_1 = __importDefault(require("../helpers/catchAsync"));
class rankController {
    constructor() {
        this.getTrackRankByDate = (0, catchAsync_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { genre } = req.body;
            //check if have genre in body request
            const genreOptions = genre ? genre : { $exists: true };
            const result = yield ranks_model_1.default.aggregate([
                {
                    $match: {
                        date: {
                            // can't not use $and in date
                            $lte: new Date(Date.now()),
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
        }));
    }
}
module.exports = new rankController();
//# sourceMappingURL=rank.controller.js.map