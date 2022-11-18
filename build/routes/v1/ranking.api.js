"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rank_controller_1 = __importDefault(require("../../controllers/rank.controller"));
const router = express_1.default.Router();
router.get("/", rank_controller_1.default.getTrackRankByDate);
exports.default = router;
//# sourceMappingURL=ranking.api.js.map