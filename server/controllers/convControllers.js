const Conversation = require("../models/Conversation");

const newConversation = async (req, res) => {
  try {
    const newConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(200).json(newConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getConversation = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
const findConversation = async (req, res) => {
  const { userIdOne, userIdTwo } = req.params;
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [userIdOne, userIdTwo] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getConversation, newConversation, findConversation };
