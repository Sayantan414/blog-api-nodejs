const express = require('express');
const { userRegisterCtrl, userLoginCtrl,
    allUsersCtrl,
    profileUserCtrl,
    deleteUserCtrl,
    updateUserCtrl, profilePhotoUploadCtrl, whoViewedMyProfileCtrl } = require('../../controllers/users/userCtrl');
const isLogin = require('../../middlewares/isLogin');
const multer = require('multer');
const storage = require('../../config/cloudinary');

const userRouter = express.Router();

const upload = multer({ storage });

//POST/api/v1/users/register
userRouter.post('/register', userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//POST/api/v1/users
userRouter.get("/", allUsersCtrl);

//POST/api/v1/users
userRouter.get("/profile/", isLogin, profileUserCtrl);

//DELETE/api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);

//PUT/api/v1/users/:id
userRouter.put("/:id", updateUserCtrl);

//POST/api/v1/users/:id
userRouter.post("/profile-photo-upload", isLogin, upload.single("profile"), profilePhotoUploadCtrl);

//PUT/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id",isLogin, whoViewedMyProfileCtrl);

module.exports = userRouter;