const User = require("../models/User");

const updateUser = async (req, res) => {
  const { userId, ...other } = req.body;
  const { id } = req.params;
  if (userId === id || req.body.isAdmin) {
    try {
      const user = await User.findOneAndUpdate(id, other, {
        new: true,
      });

      res
        .status(200)
        .json({ msg: "Account has been Updated Successfully", user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ msg: "You Can Update Only Your Account" });
  }
};

const deleteUser = async (req, res) => {
  const { userId, isAdmin } = req.body;
  const { id } = req.params;
  if (userId === id || isAdmin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ msg: "Your Account has been deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ msg: "You Can Delete Only Your Account" });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.query;
  const { username } = req.query;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserFriends = async (req, res) => {
  const { userId } = req.params;
  try {
    const currentUser = await User.findById(userId);
    const friends = await Promise.all(
      currentUser.followers.map((friendId) => User.findById(friendId))
    );
    const friendList = [];
    friends.map((friend) => {
      const { _id, username, profileImage } = friend;
      friendList.push({ _id, username, profileImage });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const followUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (id !== userId) {
    try {
      const user = await User.findById(id);
      if (!user.followers.includes(userId)) {
        const visitedUser = await User.findByIdAndUpdate(
          id,
          { $push: { followers: userId } },
          { new: true }
        );
        const currentUser = await User.findByIdAndUpdate(
          userId,
          { $push: { following: id } },
          { new: true }
        );
        res.status(200).json({ msg: "You Follow This User Successfully" });
      } else {
        res.status(403).json({ msg: "You Already follow this user" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ msg: "You can Not Follow Yourself" });
  }
};

const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (id !== userId) {
    try {
      const user = await User.findById(id);
      if (user.followers.includes(userId)) {
        const visitedUser = await User.findByIdAndUpdate(
          id,
          { $pull: { followers: userId } },
          { new: true }
        );
        const currentUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { following: id } },
          { new: true }
        );
        res.status(200).json({ msg: "You UnFollow This User Successfully" });
      } else {
        res.status(403).json({ msg: "You do not follow this user" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ msg: "You can Not Unfollow Yourself" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getUserFriends,
};
