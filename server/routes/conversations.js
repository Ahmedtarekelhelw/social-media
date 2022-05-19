const router = require("express").Router();
const {
  getConversation,
  newConversation,
  findConversation,
} = require("../controllers/convControllers");

//new conv
router.post("/", newConversation);

//get conv of a user
router.get("/:userId", getConversation);

//get conv includes two userId
router.get("/find/:userIdOne/:userIdTwo", findConversation);

module.exports = router;
