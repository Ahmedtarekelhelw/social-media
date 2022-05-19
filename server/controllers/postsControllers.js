const Post = require("../models/Post");
const User = require("../models/User");

//create post
const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post.userId === req.body.userId) {
      const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedPost);
      //  await post.updateOne({ $set: req.body });
      //  res.status(200).json(post);
    } else {
      res.status(403).json({ msg: "You can only Update Your Post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ msg: "Your Post has been deleted" });
      //  await post.updateOne({ $set: req.body });
      //  res.status(200).json(post);
    } else {
      res.status(403).json({ msg: "You can only Delete Your Post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like and dislike
const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ msg: "Your Post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ msg: "Your Post has been disliked" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get a post
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//timeline post
const timelinePost = async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.following.map((friendId) => Post.find({ userId: friendId }))
    );
    res.status(200).json(userPosts.concat(...friendPost));
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user posts
const getUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const currentUser = await User.findOne({ username });
    const userPosts = await Post.find({ userId: currentUser._id });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timelinePost,
  getUserPosts,
};
