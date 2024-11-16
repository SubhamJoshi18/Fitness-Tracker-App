import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    requried: [true, 'Please provide a comment'],
  },

  comment_like: {
    type: Number,
    default: 0,
  },

  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'Blog',
    required: false,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  comment_reply: [
    {
      type: String,
      required: false,
    },
  ],
});

const commentModel = mongoose.model('Comment', commentSchema);
export default commentModel;
