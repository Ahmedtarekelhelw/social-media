const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getUserFriends,
} = require("../controllers/usersControllers");

//update auser
router.put("/:id", updateUser);

//delete auser
router.delete("/:id", deleteUser);

//get a user
router.get("/", getUser);

//getUser Friends
router.get("/friends/:userId", getUserFriends);

//follow a user
router.put("/:id/follow", followUser);

//unfollow a user
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
