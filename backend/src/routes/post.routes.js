import express from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
import { createPost, deletePost } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post(
  "/new",
  isAuthenticated,
  upload.single("featuredImage"),
  createPost
);

router.route("/:id").delete(isAuthenticated, isAuthorized, deletePost);
export default router;
