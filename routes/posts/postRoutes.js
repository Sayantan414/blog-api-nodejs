const express = require('express');
const {
    createPostCtrl,
    singlePostCtrl,
    fetchPostsCtrl,
    deletePostCtrl,
    updatePostCtrl,
    toggleDisLikesPostCtrl,
    toggleLikesPostCtrl,
    postDetailsCtrl,
    getCommentsByPostIdCtrl
} = require('../../controllers/posts/postCtrl');
const isLogin = require('../../middlewares/isLogin');
const multer = require('multer');
const storage = require('../../config/cloudinary');

const postRouter = express.Router();

const upload = multer({ storage });

//POST/api/v1/posts
postRouter.post("/", isLogin, upload.single('image'), createPostCtrl);

//POST/api/v1/posts/:id
postRouter.get("/:id", singlePostCtrl);

//POST/api/v1/posts
postRouter.get("/", fetchPostsCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete("/:id", isLogin, deletePostCtrl);

//PUT/api/v1/posts/:id
postRouter.put("/:id", isLogin, upload.single("image"), updatePostCtrl);

//GET/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesPostCtrl);

//GET/api/v1/posts/dislikes:id
postRouter.get("/dislikes/:id", isLogin, toggleDisLikesPostCtrl);

//GET/api/v1/posts/numViews/:id
postRouter.get("/numViews/:id", isLogin, postDetailsCtrl);

//GET/api/v1/posts/comments/:id
postRouter.get("/comments/:id", isLogin, getCommentsByPostIdCtrl);

module.exports = postRouter;