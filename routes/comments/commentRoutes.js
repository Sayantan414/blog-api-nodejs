const express = require('express');
const { createCmmntCtrl,
    singleCmmntCtrl,
    allCmmntsCtrl,
    deleteCmmntCtrl,
    updateCmmntCtrl } = require('../../controllers/comments/commentCtrl');
const commentRouter = express.Router();

//POST/api/v1/comments
commentRouter.post("/", createCmmntCtrl);

//POST/api/v1/comments/:id
commentRouter.get("/:id", singleCmmntCtrl);

//POST/api/v1/comments
commentRouter.get("/", allCmmntsCtrl);

//DELETE/api/v1/comments/:id
commentRouter.delete("/:id", deleteCmmntCtrl);

//PUT/api/v1/comments/:id
commentRouter.put("/:id", updateCmmntCtrl);


module.exports = commentRouter;