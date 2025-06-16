import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { ownershipMiddleware } from "../middleware/ownershipMiddleware.js";
import { validatePost } from "../utils/validatePost.js";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.get("/post",getAllPosts);
router.get("/post/:id",getPostById);
router.post("/posts",protect,validatePost,createPost);
router.put("/posts/:id",protect,ownershipMiddleware,validatePost,updatePost);
router.delete("/posts/:id",protect,ownershipMiddleware,deletePost);

export default router;