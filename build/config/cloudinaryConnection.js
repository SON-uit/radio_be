"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadAudio = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});
function uploadAudio(filePath, fileName) {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload(filePath, {
            resource_type: "video",
            public_id: `Radio_Audio/${fileName}`,
            chunk_size: 6000000,
            eager: [
                { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                {
                    width: 160,
                    height: 100,
                    crop: "crop",
                    gravity: "south",
                    audio_codec: "none"
                }
            ]
        })
            .then((result) => {
            resolve({
                url: result.secure_url // return url after upload
            });
        })
            .catch((error) => {
            reject(error);
        });
    });
}
exports.uploadAudio = uploadAudio;
function uploadImage(filePath, fileName) {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload(filePath, {
            resource_type: "image",
            public_id: `Radio_Image/${fileName}`
        })
            .then((result) => {
            resolve({
                url: result.secure_url // return url after upload
            });
        })
            .catch((error) => {
            reject(error);
        });
    });
}
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinaryConnection.js.map