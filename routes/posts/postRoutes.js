const express = require('express');
const  {
    createPostCtrl,
    singlePostCtrl,
    allPostsCtrl,
    deletePostCtrl,
    updatePostCtrl
 } = require('../../controllers/posts/postCtrl');
const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", createPostCtrl);

//POST/api/v1/posts/:id
postRouter.get("/:id", singlePostCtrl);

//POST/api/v1/posts
postRouter.get("/", allPostsCtrl);

//DELETE/api/v1/posts/:id
postRouter.delete("/:id", deletePostCtrl);

//PUT/api/v1/posts/:id
postRouter.put("/:id", updatePostCtrl);


module.exports = postRouter;