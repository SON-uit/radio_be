"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const singer_controller_1 = __importDefault(require("../../controllers/singer.controller"));
const multer_config_1 = __importDefault(require("../../config/multer.config"));
const router = express_1.default.Router();
router.post("/", multer_config_1.default.single("singerImg"), singer_controller_1.default.createNewSinger);
router.get("/", singer_controller_1.default.getAllSinger);
//Get all tracks of singer
router.get('/:singerId', singer_controller_1.default.getSingerId);
router.get("/:singerId/albums", singer_controller_1.default.getAllAlbumOfSinger);
router.get("/:singerId/tracks", singer_controller_1.default.getAllTrackOfSinger);
exports.default = router;
//# sourceMappingURL=singers.api.js.map