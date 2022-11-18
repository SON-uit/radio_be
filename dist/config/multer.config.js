"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter(req, file, cb) {
        const filterExtension = ["audio/mpeg", "image/png", "image/jpg", "image/jpeg", "video/mp4"];
        // filter extension accepted
        if (filterExtension.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Wrong Type"));
            console.log("Error", "Wrong type upload");
        }
    }
});
exports.default = upload;
//# sourceMappingURL=multer.config.js.map