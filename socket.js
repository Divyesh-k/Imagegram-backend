// socket.js
const socketIo = require('socket.io');
const { sendMessage } = require('./controllers/chatController');

const initializeSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', ({ userId }) => {
      socket.join(userId);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const newMessage = await sendMessage(data);
        io.to(data.receiver).emit('messageReceived', newMessage);
        io.to(data.sender).emit('messageReceived', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = initializeSocket;
