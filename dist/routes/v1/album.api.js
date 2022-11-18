"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const album_controller_1 = __importDefault(require("../../controllers/album.controller"));
const multer_config_1 = __importDefault(require("../../config/multer.config"));
const router = express_1.default.Router();
router.post("/", multer_config_1.default.single("albumImg"), album_controller_1.default.createNewAlbum);
router.get("/", album_controller_1.default.getAllAlbum);
router.patch("/:albumId/uploadView", album_controller_1.default.updateView);
/* router.get('/singer/:singerId',AlbumController.getAllAlbumofSinger) */
exports.default = router;
//# sourceMappingURL=album.api.js.map