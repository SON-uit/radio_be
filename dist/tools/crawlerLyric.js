"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const crawlerLyric = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto(url, {
        waitUntil: "networkidle2"
    });
    const lyrics = yield page.evaluate(() => {
        var _a;
        const lyricDetails = (_a = document.querySelector(".lyrics_details > span")) === null || _a === void 0 ? void 0 : _a.textContent;
        const result = (lyricDetails === null || lyricDetails === void 0 ? void 0 : lyricDetails.split("\n")) || [];
        return result;
    });
    yield browser.close();
    return Promise.resolve(lyrics);
});
exports.default = crawlerLyric;
//# sourceMappingURL=crawlerLyric.js.map