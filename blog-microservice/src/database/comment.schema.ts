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

  comment_reply: [
    {
      type: String,
      required: false,
    },
  ],
});

const commentModel = mongoose.model('Comment', commentSchema);
export default commentModel;
