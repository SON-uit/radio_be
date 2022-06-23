import express from "express";
import userController from "../../controllers/user.controller";
import authController from "../../controllers/auth.controller";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getUser", authController.checkLogin, userController.getOneUser);

// User Like Track
router.use(authController.checkLogin);
router.patch("/like/singer/:singerId", userController.likeSinger);
router.patch("/like/track/:trackId", userController.likeTrack);
router.patch("/like/album/:albumId", userController.likeAlbum);
export default router;
