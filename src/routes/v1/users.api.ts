import express from "express";
import userController from "../../controllers/user.controller";
import authController from "../../controllers/auth.controller";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/getUser", authController.checkLogin, userController.getOneUser);

// User Like Track
router.patch("/like/:trackId", authController.checkLogin, userController.likeTrack);
export default router;
