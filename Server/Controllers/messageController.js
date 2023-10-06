const Message = require("../Model/messageModel");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const messageData = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (!messageData) {
      return res.json({ msg: "Failed to add message to the database" });
    }
    res.json({ msg: "Message added Successfully to the database" });
  } catch (ex) {
    next(ex);
  }
};

const getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { addMessage, getAllMessage };
