const bcrypt = require('bcryptjs');
const User = require("../../model/User/User");
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const { appErr, AppErr } = require('../../utils/appErr');
const Post = require('../../model/Post/Post');
const Comment = require('../../model/Comment/Comments');
const Category = require('../../model/Category/Category');

const userRegisterCtrl = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        //Check if email exist
        const userFound = await User.findOne({ email });
        if (userFound) {
            return next(new AppErr("User Already Exist", 500));
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create the user
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const userLoginCtrl = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return next(appErr("Invalid login credentials"))
        }
        const isPassMatched = await bcrypt.compare(password, userFound.password)
        if (!isPassMatched) {
            return next(appErr("Invalid login credentials"))
        }

        res.json({
            status: "success",
            data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                profilePhoto: userFound.profilePhoto,
                id: userFound.id,
                token: generateToken(userFound._id),
            }
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const whoViewedMyProfileCtrl = async (req, res, next) => {
    try {
        //Find the original
        const user = await User.findById(req.params.id);
        //Find the user who viewed the original user
        const userWhoViewed = await User.findById(req.userAuth);
        //Check if original and userWhoViewed are found
        if (user && userWhoViewed) {
            //Check if userWhoViewed is already in the users viewers array
            const isUserAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userWhoViewed._id.toJSON()
            );
            if (isUserAlreadyViewed) {
                return next(appErr("You already viewed this profile"));
            } else {
                //Push the userwhoViewed to the user's viewers array
                user.viewers.push(userWhoViewed._id);
                await user.save();
                res.json({
                    status: 'success',
                    data: "You have successfully viewed this profile"
                })
            }
        }

    } catch (error) {
        next(appErr(error.message));;
    }
}

const followingCtrl = async (req, res, next) => {
    try {
        const userToFollow = await User.findById(req.params.id);

        const userWhoFollowed = await User.findById(req.userAuth);

        if (userToFollow && userWhoFollowed) {
            const isUserAlreadyFollowed = userToFollow.following.find(
                follower => follower.toString() === userWhoFollowed._id.toString()
            );

            if (isUserAlreadyFollowed) {
                return next(appErr("You already followed this user"));
            } else {
                userToFollow.followers.push(userWhoFollowed._id);
                userWhoFollowed.following.push(userToFollow._id);

                await userWhoFollowed.save();
                await userToFollow.save();

                res.json({
                    status: "success",
                    data: "User Followed"
                });
            }
        }

    } catch (error) {
        res.json(error.message);
    }
}

const unFollowCtrl = async (req, res, next) => {
    try {
        const userToBeUnfollowed = await User.findById(req.params.id);

        const userWhoUnfollowed = await User.findById(req.userAuth);

        if (userToBeUnfollowed && userWhoUnfollowed) {
            const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
                follower => follower.toString() === userWhoUnfollowed._id.toString()
            );

            if (!isUserAlreadyFollowed) {
                return next(appErr("You have not followed this user"));
            } else {
                userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
                    follower => follower.toString() !== userWhoUnfollowed._id.toString()
                );

                await userToBeUnfollowed.save();

                userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
                    following => following.toString() !== userToBeUnfollowed._id.toString()
                );

                await userWhoUnfollowed.save();

                res.json({
                    status: "success",
                    data: "User Unfollowed"
                });
            }
        }

    } catch (error) {
        next(appErr(error.message));
    }
}

const blockCtrl = async (req, res, next) => {
    try {
        const userToBeBlocked = await User.findById(req.params.id);

        const userWhoBlocked = await User.findById(req.userAuth);

        if (userToBeBlocked && userWhoBlocked) {
            const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
                blocked => blocked.toString() === userToBeBlocked._id.toString()
            );
            if (isUserAlreadyBlocked) {
                return next(appErr("You already blocked this user"));
            }

            userWhoBlocked.blocked.push(userToBeBlocked._id);
            await userWhoBlocked.save();
            res.json({
                status: "success",
                data: "User Blocked"
            });
        }


    } catch (error) {
        next(appErr(error.message));
    }
}

const unblockCtrl = async (req, res, next) => {
    try {
        const userToBeUnBlocked = await User.findById(req.params.id);
        const userWhoUnBlocked = await User.findById(req.userAuth);

        if (userWhoUnBlocked && userToBeUnBlocked) {
            const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
                blocked => blocked.toString() === userToBeUnBlocked._id.toString()
            );

            if (!isUserAlreadyBlocked) {
                return next(appErr("You have not blocked this user"));
            }

            userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
                blocked => blocked.toString() !== userToBeUnBlocked._id.toString()
            );

            await userWhoUnBlocked.save();
            res.json({
                status: "success",
                data: "User Unblocked"
            });
        }

    } catch (error) {
        next(appErr(error.message));
    }
}

const adminBlockCtrl = async (req, res, next) => {
    try {
        const userToBeBlocked = await User.findById(req.params.id);
        if (!userToBeBlocked) {
            return next(appErr("User not Found"))
        }
        userToBeBlocked.isBlocked = true;
        await userToBeBlocked.save();

        res.json({
            status: "success",
            data: "You have successfully Blocked this user"
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const adminUnBlockCtrl = async (req, res, next) => {
    try {
        const userToBeUnBlocked = await User.findById(req.params.id);
        if (!userToBeUnBlocked) {
            return next(appErr("User not Found"))
        }
        userToBeUnBlocked.isBlocked = false;
        await userToBeUnBlocked.save();

        res.json({
            status: "success",
            data: "You have successfully Unblocked this user"
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const allUsersCtrl = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({
            status: "success",
            data: users
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const profileUserCtrl = async (req, res, next) => {
    try {
        const user = await User.findById(req.userAuth).populate("posts");
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const otherProfileUserCtrl = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const deleteUserCtrl = async (req, res, next) => {
    try {
        //1. Find the user to be deleted
        const userTodelete = await User.findById(req.userAuth);
        //2. find all posts to be deleted
        await Post.deleteMany({ user: req.userAuth });
        //3. Delete all comments of the user
        await Comment.deleteMany({ user: req.userAuth });
        //4. Delete all category of the user
        await Category.deleteMany({ user: req.userAuth });
        //5. delete
        await User.findByIdAndDelete(req.userAuth);
        //send response
        return res.json({
            status: "success",
            data: "Your account has been deleted successfully",
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const updateUserCtrl = async (req, res) => {
    const { email, lastname, firstname } = req.body;
    try {
        //Check if email is not taken
        if (email) {
            const emailTaken = await User.findOne({ email });
            if (emailTaken) {
                return next(appErr("Email is taken", 400));
            }
        }

        //update the user
        const user = await User.findByIdAndUpdate(
            req.userAuth,
            {
                lastname,
                firstname,
                email,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        //send response
        res.json({
            status: "success",
            data: user,
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const updatePasswordCtrl = async (req, res, next) => {
    const { password } = req.body;
    try {
        //Check if user is updating the password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            //update user
            await User.findByIdAndUpdate(
                req.userAuth,
                { password: hashedPassword },
                { new: true, runValidators: true }
            );
            res.json({
                status: "success",
                data: "Password has been changed successfully",
            });
        } else {
            return next(appErr("Please provide password field"));
        }
    } catch (error) {
        next(appErr(error.message));
    }
};

const profilePhotoUploadCtrl = async (req, res) => {
    console.log(req.file);
    try {
        //Find the user to be updated
        const userToUpdate = await User.findById(req.userAuth);
        //Check if user is found
        if (!userToUpdate) {
            return next(appErr("User not found", 403));
        }
        //check if user is blocked
        if (userToUpdate.isBlocked) {
            return next(appErr("Action not allowed, your account is blocked", 403));
        }
        //check if a user is updating their photo
        if (req.file) {
            //Update profile photo
            await User.findByIdAndUpdate(req.userAuth, {
                $set: {
                    profilePhoto: req.file.path,
                }
            }, {
                new: true
            });
            res.json({
                status: "success",
                data: req.file.path
            });
        }
    } catch (error) {
        next(appErr(error.message));
    }
}

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
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
    updatePasswordCtrl,
    otherProfileUserCtrl
}