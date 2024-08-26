const express = require('express');
const { userRegisterCtrl, userLoginCtrl,
    allUsersCtrl,
    profileUserCtrl,
    deleteUserCtrl,
    updateUserCtrl,
    profilePhotoUploadCtrl,
    whoViewedMyProfileCtrl,
    followingCtrl,
    unFollowCtrl,
    blockCtrl,
    unblockCtrl,
    adminBlockCtrl,
    adminUnBlockCtrl,
    // updatePasswordCtrl,
    otherProfileUserCtrl } = require('../../controllers/users/userCtrl');
const isLogin = require('../../middlewares/isLogin');
const multer = require('multer');
const storage = require('../../config/cloudinary');
const isAdmin = require('../../middlewares/isAdmin');

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

//DELETE/api/v1/users/
userRouter.delete("/delete-account", isLogin, deleteUserCtrl);

//PUT/api/v1/users/:id
userRouter.put("/", isLogin, updateUserCtrl);

//PUT/api/v1/users/:id
// userRouter.put("/update-password", isLogin, updatePasswordCtrl);

//POST/api/v1/users/:id
userRouter.post("/profile-photo-upload", isLogin, upload.single("profile"), profilePhotoUploadCtrl);

//GET/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, followingCtrl);

//GET/api/v1/users/unfollow/:id
userRouter.get("/unfollow/:id", isLogin, unFollowCtrl);

//GET/api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockCtrl);

//GET/api/v1/users/unblock/:id
userRouter.get("/unblock/:id", isLogin, unblockCtrl);

//PUT/api/v1/users/adminBlock/:id
userRouter.put("/adminBlock/:id", isLogin, isAdmin, adminBlockCtrl);

//PUT/api/v1/users/adminUnBlock/:id
userRouter.put("/adminUnBlock/:id", isLogin, isAdmin, adminUnBlockCtrl);

//GET/api/v1/users/otherUser/:id
userRouter.get("/otherUser/:id", isLogin, otherProfileUserCtrl);


module.exports = userRouter;