import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    required: true,
  },
  downvotes: {
    type: Number,
    required: true,
  },
  comments: {
    type: [String],
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
