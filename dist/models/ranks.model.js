"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rankSchema = new mongoose_1.default.Schema({
    topRank: [
        {
            name: { type: String },
            trackId: { type: String }
        }
    ],
    genre: { type: String },
    date: { type: Date }
});
const Rank = mongoose_1.default.model("Rank", rankSchema);
exports.default = Rank;
//# sourceMappingURL=ranks.model.js.map