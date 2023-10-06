const { Router } = require("express");
const {
  getAllMessage,
  addMessage,
} = require("../Controllers/messageController");
const router = Router();

// Route 1: This is to add a message / METHOD: POST
router.post("/add-msg", addMessage);

// Route 2: This is to get all the messages/ METHOD: POST
router.post("/get-msg", getAllMessage);

module.exports = router;
