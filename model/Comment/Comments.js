const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // This should be an ObjectId reference
      ref: "User", // Ensure this references the User model
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, },
  
);

commentSchema.pre(/^find/, function (next) {
  // Virtual property to get the time elapsed
  commentSchema.virtual('timeAgo').get(function () {
    const comment = this;
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const elapsed = now - createdAt;

    const minutesAgo = Math.floor(elapsed / 60000);
    const hoursAgo = Math.floor(elapsed / 3600000);
    const daysAgo = Math.floor(elapsed / 86400000);

    if (daysAgo > 0) {
      return daysAgo === 1
        ? 'Yesterday'
        : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1
        ? '1 hour'
        : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1
        ? '1 minute'
        : `${minutesAgo} minutes ago`;
    } else {
      return 'Just now';
    }
  });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;