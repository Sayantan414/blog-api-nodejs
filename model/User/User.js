const mongoose = require("mongoose");
const Post = require("../Post/Post");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name is required"]
    },
    profilePhoto: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    blocked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    // plan: {
    //     type: String,
    //     enum: ['Free', 'Premium', 'Pro'],
    //     default: 'Free'
    // },
    userAward: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold'],
        default: 'Bronze'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

//Hooks
userSchema.pre("findOne", async function (next) {
    this.populate('posts');
    const userId = this._conditions._id;
    const user = await User.find({ _id: userId })
    const posts = await Post.find({ user: userId })
    const lastPost = posts[posts.length - 1];
    const lastPostDate = new Date(lastPost?.createdAt);
    const lastPostDateStr = lastPostDate.toDateString();

    userSchema.virtual("lastPostDate").get(function () {
        return lastPostDateStr;
    });

    const currentDate = new Date();
    const diff = currentDate - lastPostDate;
    const diffInDays = diff / (1000 * 3600 * 24);

    if (!user[0]?.isAdmin) {
        if (diffInDays > 30) {
            userSchema.virtual("isInActive").get(function () {
                return true;
            });
            //Find the user by ID and update
            await User.findByIdAndUpdate(userId, {
                isBlocked: true
            }, {
                new: true,
            });

        } else {
            userSchema.virtual("isInActive").get(function () {
                return false;
            });
            //Find the user by ID and update
            await User.findByIdAndUpdate(userId, {
                isBlocked: false
            }, {
                new: true,
            });
        }
    }

    //Last day active
    const daysAgo = Math.floor(diffInDays);

    userSchema.virtual("lastActive").get(function () {
        if (daysAgo <= 0) {
            return "Today";
        }
        if (daysAgo === 1) {
            return "Yesterday";
        }
        if (daysAgo > 1) {
            return `${daysAgo}`
        }
    });

    //Update userAward based on the number of posts
    const numberOfPosts = posts.length;

    if (numberOfPosts < 10) {
        await User.findByIdAndUpdate(
            userId,
            {
                userAward: "Bronze"
            },
            {
                new: true
            }
        )
    }

    if (numberOfPosts > 10) {
        await User.findByIdAndUpdate(
            userId,
            {
                userAward: "Silver"
            },
            {
                new: true
            }
        )
    }

    if (numberOfPosts > 20) {
        await User.findByIdAndUpdate(
            userId,
            {
                userAward: "Gold"
            },
            {
                new: true
            }
        )
    }

    next();
})

userSchema.post("save", function (next) {
    console.log("Post hook called");
    next();
})

userSchema.virtual("fullname").get(function () {
    return `${this.firstname} ${this.lastname}`;
})

userSchema.virtual("initials").get(function () {
    return `${this.firstname[0]}${this.lastname[0]}`;
})

userSchema.virtual("postCounts").get(function () {
    return this.posts.length;
})

userSchema.virtual("followersCount").get(function () {
    return this.followers.length;
})

userSchema.virtual("followeringCount").get(function () {
    return this.following.length;
})

userSchema.virtual("viewersCount").get(function () {
    return this.viewers.length;
})

userSchema.virtual("blockedCount").get(function () {
    return this.blocked.length;
})

const User = mongoose.model('User', userSchema);

module.exports = User;