import Post from "../models/post";

const POSTS_PER_PAGE = 5;

function validatePost(content) {
  if (
    typeof content !== "string" ||
    content.length < 10 ||
    content.length > 1000
  ) {
    return false;
  }
  return true;
}

function validateComment(content) {
  if (
    typeof content !== "string" ||
    content.length < 5 ||
    content.length > 500
  ) {
    return false;
  }
  return true;
}

async function postPost(req, res, next) {
  const content = req.body.text;
  try {
    if (!validatePost(content)) {
      return res.status(400).send("Validation failed");
    }
    const post = await Post.create(req.body);
    res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function postComment(req, res, next) {
  const content = req.body.comment;
  const id = req.body.id;
  try {
    if (!validateComment(content)) {
      return res.status(400).send("Validation failed");
    }
    await Post.updateOne({ _id: id }, { $push: { comments: content } });
    const result = {
      content,
      id,
    };
    res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getPosts(req, res, next) {
  const { page, sortBy } = req.query;
  try {
    const totalPosts = await Post.find().countDocuments();
    if (sortBy === "popular") {
      const posts = await Post.find()
        .sort({ upvotes: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE);
      return res.status(200).send({ posts, totalPosts });
    } else if (sortBy === "latest") {
      const posts = await Post.find()
        .sort({ date: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE);
      return res.status(200).send({ posts, totalPosts });
    } else {
      const posts = await Post.find()
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE);
      return res.status(200).send({ posts, totalPosts });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getPostsBySearchTerm(req, res, next) {
  const { page, sortBy, searchTerm } = req.query;
  try {
    const totalPosts = await Post.find({
      $text: { $search: searchTerm, $caseSensitive: false },
    }).countDocuments();
    if (sortBy === "popular") {
      const filteredPosts = await Post.find({
        $text: { $search: searchTerm, $caseSensitive: false },
      })
        .sort({ upvotes: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE);
      return res.status(200).send({ filteredPosts, totalPosts });
    } else if (sortBy === "latest") {
      const filteredPosts = await Post.find({
        $text: { $search: searchTerm, $caseSensitive: false },
      })
        .sort({ date: -1 })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE);
      return res.status(200).send({ filteredPosts, totalPosts });
    } else {
      const filteredPosts = await Post.find({
        $text: { $search: searchTerm, $caseSensitive: false },
      })
        .skip((page - 1) * POSTS_PER_PAGE)
        .limit(POSTS_PER_PAGE);
      return res.status(200).send({ filteredPosts, totalPosts });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
}

export { postPost, getPosts, getPostById, getPostsBySearchTerm, postComment };
