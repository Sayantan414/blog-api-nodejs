const express = require('express');
const { createCmmntCtrl,
    deleteCmmntCtrl,
    updateCmmntCtrl } = require('../../controllers/comments/commentCtrl');

const isLogin = require("../../middlewares/isLogin");

const commentRouter = express.Router();

//POST/api/v1/comments
commentRouter.post("/:id", isLogin, createCmmntCtrl);

//DELETE/api/v1/comments/:id
commentRouter.delete("/:id", isLogin, deleteCmmntCtrl);

//PUT/api/v1/comments/:id
commentRouter.put("/:id", isLogin, updateCmmntCtrl);


module.exports = commentRouter;