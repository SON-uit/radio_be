import express from "express";

import AlbumController from "../../controllers/album.controller";
import uploadMulter from "../../config/multer.config";
const router = express.Router();

router.post("/", uploadMulter.single("albumImg"), AlbumController.createNewAlbum);
router.get("/", AlbumController.getAllAlbum);
router.patch("/:albumId/uploadView", AlbumController.updateView);
/* router.get('/singer/:singerId',AlbumController.getAllAlbumofSinger) */
export default router;
