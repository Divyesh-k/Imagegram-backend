const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "default_profile.png" },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  saves: [{ type: Schema.Types.ObjectId, ref: "Saves" }],
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);

