import Post from "../models/post";

const postPost = (req, res, next) => {
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
  post
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Post created :D",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: "Could not create a post :(",
      });
    });
};

const getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      return res
        .status(200)
        .json({ success: true, data: posts, message: "Got all posts :)" });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: "Could not get posts :'(",
      });
    });
};

export { postPost, getPosts };
