const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: String,
  tags: [String],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Saves",
  }],
}, {
  timestamps: true,
});

postSchema.post('save', async function(doc) {
  if (doc.isNew) {  // Only run this for newly created documents
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(
      doc.creator,
      { $addToSet: { posts: doc._id } },
      { new: true, useFindAndModify: false }
    );
  }
});

module.exports = mongoose.model("Post", postSchema);
