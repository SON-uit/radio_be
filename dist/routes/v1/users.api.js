"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const router = express_1.default.Router();
router.post("/register", auth_controller_1.default.register);
router.post("/login", auth_controller_1.default.login);
router.get("/getUser", auth_controller_1.default.checkLogin, user_controller_1.default.getOneUser);
// User Like Track
router.use(auth_controller_1.default.checkLogin);
router.patch("/like/singer/:singerId", user_controller_1.default.likeSinger);
router.patch("/like/track/:trackId", user_controller_1.default.likeTrack);
router.patch("/like/album/:albumId", user_controller_1.default.likeAlbum);
exports.default = router;
//# sourceMappingURL=users.api.js.map