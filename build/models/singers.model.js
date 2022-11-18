"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const singerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    urlImage: { type: String, required: true },
    description: { type: String, required: true },
    like: { type: Number, default: 0 },
    type: [{ type: String, required: true }],
    nation: { type: String, required: true }
}, { timestamps: true });
const Singer = mongoose_1.default.model("Singer", singerSchema);
exports.default = Singer;
//# sourceMappingURL=singers.model.js.map