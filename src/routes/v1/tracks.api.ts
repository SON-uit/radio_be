import express from "express";
import TrackController from "../../controllers/track.controller";
import uploadMulter from "../../config/multer.config";

const router = express.Router();

router.post(
  "/",
  uploadMulter.fields([
    { name: "trackAudio", maxCount: 1 },
    { name: "trackImage", maxCount: 1 }
  ]),
  TrackController.createNewTrack
);
router.get("/", TrackController.getAllTrack);
export default router;
