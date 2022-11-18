"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const track_controller_1 = __importDefault(require("../../controllers/track.controller"));
const multer_config_1 = __importDefault(require("../../config/multer.config"));
const router = express_1.default.Router();
router.post("/", multer_config_1.default.fields([
    { name: "trackAudio", maxCount: 1 },
    { name: "trackImage", maxCount: 1 }
]), track_controller_1.default.createNewTrack);
router.get("/", track_controller_1.default.getAllTrack);
router.patch("/:trackId/uploadView", track_controller_1.default.uploadView);
router.patch("/:trackId/uploadGeners", track_controller_1.default.uploadGeners);
exports.default = router;
//# sourceMappingURL=tracks.api.js.map