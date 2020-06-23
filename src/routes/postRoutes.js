import express from "express";

import { postPost, getPosts } from "../controllers/postController";

const router = express.Router();

router.post("/create-post", postPost);
router.get("/", getPosts);

export default router;
