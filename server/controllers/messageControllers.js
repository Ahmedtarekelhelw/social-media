const Message = require("../models/Message");

const addMessages = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Message.find({ conversationId });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addMessages, getMessages };
