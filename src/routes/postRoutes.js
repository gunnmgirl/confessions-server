import express from "express";

import { postPost, getPosts } from "../controllers/postController";

const router = express.Router();

router.post("/", postPost);
router.get("/", getPosts);

export default router;
