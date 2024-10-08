const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

const createPostCtrl = async (req, res, next) => {
    const { title, description, category } = req.body;
  try {
    //Find the user
    const author = await User.findById(req.userAuth);
    //check if the user is blocked
    if (author.isBlocked) {
      return next(appErr("Access denied, account blocked", 403));
    }
    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path
    });
    //Associate user to a post -Push the post into the user posts field
    author.posts.push(postCreated);
    //save
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
}

const singlePostCtrl = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id).populate("user")
      .populate("category", "title");
      if(!post){
        return next(appErr("Post not found", 404));
      }
        res.json({
            status: "success",
            data: post
        });
    } catch (error) {
      next(appErr(error.message));
    }
}

const fetchPostsCtrl = async (req, res, next) => {
    try {
        //Find all posts
        const posts = await Post.find({})
          .populate("user")
          .populate("category", "title");
    
        //Check if the user is blocked by the post owner
        const filteredPosts = posts.filter(post => {
          //get all blocked users
          const blockedUsers = post.user.blocked;
          const isBlocked = blockedUsers?.includes(req.userAuth);
    
          // return isBlocked ? null : post;
          return !isBlocked;
        });
    
        res.json({
          status: "success",
          data: filteredPosts,
        });
      } catch (error) {
        next(appErr(error.message));
      }
}

const deletePostCtrl = async (req, res, next) => {
  try {
    //check if the post belongs to the user

    //find the post
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this post", 403));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Post deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
}

const updatePostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //find the post
    const post = await Post.findById(req.params.id);
    //check if the post belongs to the user
// console.log("object");

    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this post", 403));
    }
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
}

const toggleDisLikesPostCtrl = async (req, res, next) => {
    try {
      //1. Get the post
      const post = await Post.findById(req.params.id);
      //2. Check if the user has already unliked the post
      const isUnliked = post.dislikes.includes(req.userAuth);
      const isliked = post.likes.includes(req.userAuth);
      //3. If the user has already liked the post, unlike the post
      if (isUnliked) {
        post.dislikes = post.dislikes.filter(
          dislike => dislike.toString() !== req.userAuth.toString()
        );
        await post.save();
      } else if(isliked && !isUnliked) {
        //4. If the user has not liked the post, like the post
        post.likes = post.likes.filter(
          like => like.toString() !== req.userAuth.toString()
        );
        post.dislikes.push(req.userAuth);
        await post.save();
      }else{
        post.dislikes.push(req.userAuth);
        await post.save();
      }
      res.json({
        status: "success",
        data: post,
      });
    } catch (error) {
      next(appErr(error.message));
    }
  };
  
  //toggleLike
  const toggleLikesPostCtrl = async (req, res, next) => {
    try {
      //1. Get the post
      const post = await Post.findById(req.params.id);
      //2. Check if the user has already liked the post
      const isLiked = post.likes.includes(req.userAuth);
      const isUnliked = post.dislikes.includes(req.userAuth);
      //3. If the user has already liked the post, unlike the post
      if (isLiked) {
        post.likes = post.likes.filter(
          like => like.toString() !== req.userAuth.toString()
        );
        await post.save();
      } else if(isUnliked && !isLiked){
        post.dislikes = post.dislikes.filter(
          dislike => dislike.toString() !== req.userAuth.toString()
        );
        post.likes.push(req.userAuth);
        await post.save();
      } else {
        //4. If the user has not liked the post, like the post
        post.likes.push(req.userAuth);
        await post.save();
      }
      res.json({
        status: "success",
        data: post,
      });
    } catch (error) {
      next(appErr(error.message));
    }
  };

  const postDetailsCtrl = async (req, res, next) => {
    try {
      //find the post
      const post = await Post.findById(req.params.id);
      //Number of view
      //check if user viewed this post
      
      const isViewed = post.numViews.includes(req.userAuth);
      if (isViewed) {
        res.json({
          status: "success",
          data: post,
        });
      } else {
        //pust the user into numOfViews
        post.numViews.push(req.userAuth);
        //save
        await post.save();
        res.json({
          status: "success",
          data: post,
        });
      }
    } catch (error) {
      next(appErr(error.message));
    }
  };

  const getCommentsByPostIdCtrl = async (req, res, next) => {
    try {
      // Find the post by ID and populate comments with user details
      const post = await Post.findById(req.params.id)
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "User", // Reference to the User model
          }
        });
  
      // If no post is found, return an error
      if (!post) {
        return next(appErr("Post not found", 404));
      }
  
      // Ensure comments is an array, or set it to an empty array
      const comments = post.comments || [];
  
      res.json({
        status: "success",
        data: comments,
      });
    } catch (error) {
      next(appErr(error.message));
    }
  };


module.exports = {
    createPostCtrl,
    singlePostCtrl,
    fetchPostsCtrl,
    deletePostCtrl,
    updatePostCtrl,
    toggleDisLikesPostCtrl,
    toggleLikesPostCtrl,
    postDetailsCtrl,
    getCommentsByPostIdCtrl
}