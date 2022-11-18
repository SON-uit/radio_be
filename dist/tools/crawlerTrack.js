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
const downloadFile_1 = require("./downloadFile");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://zingmp3.vn/album/Top-100-Pop-Au-My-Hay-Nhat-Adele-The-Kid-LAROI-Justin-Bieber-DJ-Snake/ZWZB96AB.html", {
        waitUntil: "networkidle2"
    });
    // get all track element
    const elHandleArray = yield page.$$(".select-item"); //.icon.action-play.ic-play
    //filter vip tracks -> only get not vip track
    const notVipItems = [];
    for (const item of elHandleArray) {
        const isVipRequired = yield item.$(".ic-svg-vip-label");
        if (!isVipRequired) {
            notVipItems.push(item);
        }
    }
    const linkAudio = [];
    let count = 0; // get 10 tracks
    for (const el of notVipItems) {
        const name = yield el.$eval(".title span span span", (track) => track.textContent);
        const actionBtn = yield el.$(".icon.action-play.ic-play");
        if (count === 5)
            break;
        yield (actionBtn === null || actionBtn === void 0 ? void 0 : actionBtn.click());
        yield page.waitForTimeout(5000);
        const url = yield page.evaluate(() => {
            var _a;
            const linkTrack = (_a = document.querySelector("audio")) === null || _a === void 0 ? void 0 : _a.src;
            return linkTrack;
        });
        linkAudio.push({
            nameTrack: name,
            linkTrack: url
        });
        count++;
    }
    const result = [...new Set(linkAudio)]; // remove duplicates
    yield browser.close();
    //download tracks
    yield Promise.all(result.map((trackInfo) => __awaiter(void 0, void 0, void 0, function* () {
        if (trackInfo.linkTrack && trackInfo.nameTrack) {
            yield (0, downloadFile_1.downloadFile)(trackInfo.linkTrack, trackInfo.nameTrack);
        }
    })));
    //
}))();
//# sourceMappingURL=crawlerTrack.js.map