import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});
function uploadAudio(filePath: string, fileName: string): Promise<{ url: string }> {
  return new Promise<{ url: string }>((resolve, reject) => {
    cloudinary.uploader
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
function uploadImage(filePath: string, fileName: string): Promise<{ url: string }> {
  return new Promise<{ url: string }>((resolve, reject) => {
    cloudinary.uploader
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
export { uploadAudio, uploadImage };
