const express = require('express');
const { userRegisterCtrl, userLoginCtrl,
    allUsersCtrl,
    profileUserCtrl,
    deleteUserCtrl,
    updateUserCtrl } = require('../../controllers/users/userCtrl');

const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//POST/api/v1/users
userRouter.get("/", allUsersCtrl);

//POST/api/v1/users
userRouter.get("/profile/:id", profileUserCtrl);

//DELETE/api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);

//PUT/api/v1/users/:id
userRouter.put("/:id", updateUserCtrl);

module.exports = userRouter;