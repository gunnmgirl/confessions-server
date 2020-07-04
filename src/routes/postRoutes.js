import express from "express";

import {
  postPost,
  getPosts,
  getPostById,
  postComment,
  getPostsBySearchTerm,
} from "../controllers/postController";

const router = express.Router();

router.post("/", postPost);
router.post("/:id", postComment);
router.get("/search", getPostsBySearchTerm);
router.get("/", getPosts);
router.get("/:id", getPostById);

export default router;
