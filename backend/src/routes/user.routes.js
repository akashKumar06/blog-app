import express from "express";
import { register, login, logout } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  register
);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
export default router;
