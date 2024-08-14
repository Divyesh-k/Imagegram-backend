// controllers/chatController.js
const ChatMessage = require('../models/Chat');

const getMessages = async (req, res) => {
  const { userId, otherUserId } = req.params;
  try {
    const messages = await ChatMessage.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const sendMessage = async (data) => {
  const { sender, receiver, message } = data;
  try {
    const newMessage = new ChatMessage({ sender, receiver, message });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error('Failed to send message');
  }
};

module.exports = { getMessages, sendMessage };