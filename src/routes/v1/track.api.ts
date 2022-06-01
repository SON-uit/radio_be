import express from "express";
import TrackController from "../../controllers/track.controller";
import multer from "multer";
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter(req, file, cb) {
    const filterExtension = ["audio/mpeg", "image/png", "image/jpg", "image/jpeg"];
    // filter extension accepted
    if (filterExtension.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Wrong Type"));
    }
  }
});
router.post("/", upload.single("trackAudio"), TrackController.createNewTrack);
router.get("/", TrackController.getAllTrack);
export default router;
