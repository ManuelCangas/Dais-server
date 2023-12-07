import express from "express";
import {
  deletePost,
  getAllPost,
  getPost,
  getUserPosts,
  patchPost,
  postPost,
} from "../controllers/post.js";
import { upload } from "../controllers/post.js";
import { authenticateToken } from "../middleware/AuthPlayer.js";
const router = express.Router();

router.get("/", getAllPost);

router.get("/:id", getPost);

router.post("/", upload.single("rutaImg"), postPost);

router.post("/post", authenticateToken, getUserPosts);

router.patch("/:id", patchPost);

router.delete("/:id", deletePost);

export default router;
