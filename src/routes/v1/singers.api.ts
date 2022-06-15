import express from "express";

import SingerController from "../../controllers/singer.controller";
import AuthController from "../../controllers/auth.controller";
import multerUpload from "../../config/multer.config";
const router = express.Router();

router.post("/", multerUpload.single("singerImg"), SingerController.createNewSinger);
router.get("/", SingerController.getAllSinger);

//Get all tracks of singer
router.get('/:singerId', SingerController.getSingerId)
router.get("/:singerId/albums", SingerController.getAllAlbumOfSinger)
router.get("/:singerId/tracks", SingerController.getAllTrackOfSinger);
export default router;
