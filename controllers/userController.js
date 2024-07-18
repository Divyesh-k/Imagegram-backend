// controllers/userController.js
const User = require('../models/User');

// GET all users in descending order of createdAt
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET user by ID
const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate('posts').populate('likedPosts').populate('saves');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// POST new user
const createUser = async (req, res) => {
    // Implement logic to create a new user
};

// PUT update user
const updateUser = async (req, res) => {
    // Implement logic to update user by ID
};

// DELETE user
const deleteUser = async (req, res) => {
    // Implement logic to delete user by ID
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};