import Post from "../models/post";

function validate(content) {
  if (
    typeof content !== "string" ||
    content.length < 10 ||
    content.length > 1000
  ) {
    return false;
  }
  return true;
}

async function postPost(req, res, next) {
  const content = req.body.text;
  try {
    if (!validate(content)) {
      return res.status(400).send("Validation failed");
    }
    const post = await Post.create(req.body);
    res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
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
