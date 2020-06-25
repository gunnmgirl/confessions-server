import Post from "../models/post";

async function postPost(req, res, next) {
  const text = req.body.text;
  const upvotes = req.body.upvotes;
  const downvotes = req.body.downvotes;
  const comments = req.body.comments;
  const post = new Post({
    text: text,
    upvotes: upvotes,
    downvotes: downvotes,
    comments: comments,
  });
  try {
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post created :D",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "Could not create a post :(",
    });
  }
}

async function getPosts(req, res, next) {
  try {
    const posts = await Post.find();
    return res
      .status(200)
      .json({ success: true, posts, message: "Got all posts :)" });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "Could not get posts :'(",
    });
  }
}

export { postPost, getPosts };
