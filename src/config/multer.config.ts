import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter(req, file, cb) {
    const filterExtension = ["audio/mpeg", "image/png", "image/jpg", "image/jpeg", "video/mp4"];
    // filter extension accepted
    if (filterExtension.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Wrong Type"));
      console.log("Error", "Wrong type upload");
    }
  }
});

export default upload;
