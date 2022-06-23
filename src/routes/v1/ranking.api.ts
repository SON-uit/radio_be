import express from "express";
import rankController from "../../controllers/rank.controller";
const router = express.Router();

router.get("/", rankController.getTrackRankByDate);

export default router;
