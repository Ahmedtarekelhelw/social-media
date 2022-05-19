const router = require("express").Router();
const {
  addMessages,
  getMessages,
} = require("../controllers/messageControllers");

//add
router.post("/", addMessages);

//get
router.get("/:conversationId", getMessages);

module.exports = router;
