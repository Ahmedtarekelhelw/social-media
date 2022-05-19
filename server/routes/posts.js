const router = require("express").Router();

const Post = require("../models/Post");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timelinePost,
  getUserPosts,
} = require("../controllers/postsControllers");

//create a post
router.post("/", createPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like a post
router.put("/:id/like", likePost);

//get a post
router.get("/:id", getPost);
//get timeline posts
router.get("/timeline/:userId", timelinePost);

//get user posts
router.get("/profile/:username", getUserPosts);
module.exports = router;
