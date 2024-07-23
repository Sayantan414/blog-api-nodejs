const express = require('express');
const {
    createPostCtrl,
    singlePostCtrl,
    fetchPostsCtrl,
    deletePostCtrl,
    updatePostCtrl,
    toggleDisLikesPostCtrl,
    toggleLikesPostCtrl,
    postDetailsCtrl
} = require('../../controllers/posts/postCtrl');
const isLogin = require('../../middlewares/isLogin');

const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", isLogin, createPostCtrl);

//POST/api/v1/posts/:id
postRouter.get("/:id", singlePostCtrl);

//POST/api/v1/posts
postRouter.get("/", isLogin, fetchPostsCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete("/:id", deletePostCtrl);

//PUT/api/v1/posts/:id
postRouter.put("/:id", updatePostCtrl);

//GET/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesPostCtrl);

//GET/api/v1/posts/dislikes:id
postRouter.get("/dislikes/:id", isLogin, toggleDisLikesPostCtrl);

//GET/api/v1/posts/:id
postRouter.get("/:id", isLogin, postDetailsCtrl);

module.exports = postRouter;