import * as Yup from "yup";

import Post from "../models/post";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(1000, "Must be less than 1000 characters")
    .min(10, "Must me at least 10 characters")
    .required("Required!"),
});

async function postPost(req, res, next) {
  try {
    await validationSchema.validate(req.body.text, { abortEarly: false });
    const post = await Post.create(req.body);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getPosts(req, res, next) {
  try {
    const posts = await Post.find();
    return res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
}

export { postPost, getPosts };
