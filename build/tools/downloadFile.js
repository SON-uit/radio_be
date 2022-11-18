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
exports.downloadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
/* const url =
  "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/8071efdeaf9f46c11f8e/9028505964664915724?authen=exp=1654163232~acl=/8071efdeaf9f46c11f8e/*~hmac=29094bde4fbea0639b738e01fd49e8f1&fs=MTY1Mzk5MDQzMjQzNXx3ZWJWNnwwfDE0LjE3My4yMi4xODQ"; */
const downloadFile = (url, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, axios_1.default)({
        method: "GET",
        url: url,
        responseType: "stream"
    });
    return new Promise((resolve, reject) => {
        try {
            const fileStream = fs_1.default.createWriteStream(`src/data/${fileName}.mp3`);
            response.data.pipe(fileStream);
            fileStream.on("finish", () => {
                fileStream.close();
                resolve();
                console.log("done");
            });
            fileStream.on("error", (error) => {
                fileStream.close();
                reject();
                console.error("Error" + error);
            });
        }
        catch (error) {
            console.error("Error", error);
        }
    });
});
exports.downloadFile = downloadFile;
//# sourceMappingURL=downloadFile.js.map