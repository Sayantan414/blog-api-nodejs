const bcrypt = require('bcryptjs');
const User = require("../../model/User/User");
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
const { appErr, AppErr } = require('../../utils/appErr');

const userRegisterCtrl = async (req, res, next) => {
    const { firstname, lastname, profilePhoto, email, password } = req.body
    try {
        const userFound = await User.findOne({ email });
        if (userFound) {
            return next(new AppErr("User Already Exist", 500))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const user = await User.create({
            firstname, lastname, profilePhoto, email, password: hashedPassword
        })
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        next(appErr(error.message));
    }
}

const userLoginCtrl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.json({
                msg: 'Invalid login credentials'
            })
        }
        const isPassMatched = await bcrypt.compare(password, userFound.password)
        if (!isPassMatched) {
            return res.json({
                msg: 'Invalid login credentials'
            })
        }

        res.json({
            status: "success",
            data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id),
            }
        });
    } catch (error) {
        res.json(error.message);
    }
}

const whoViewedMyProfileCtrl = async (req, res) => {
    try {
        //Find the original
        const user = await User.findById(req.params.id);
        //Find the user who viewed the original user
        const userWhoViewed = await User.findById(req.userAuth);
        //Check if original and userWhoViewed are found
        if(user && userWhoViewed){
            //Check if userWhoViewed is already in the users viewers array
            const isUserAlreadyViewed = user.viewers.find(
                viewer => viewer.toString() === userWhoViewed._id.toJSON()
            );
            if(isUserAlreadyViewed){
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
        res.json(error.message);
    }
}

const allUsersCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Users route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const profileUserCtrl = async (req, res) => {
    try {
        const user = await User.findById(req.userAuth);
        res.json({
            status: "success",
            data: user
        });
    } catch (error) {
        res.json(error.message);
    }
}

const deleteUserCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Delete user route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const updateUserCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Update user route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const profilePhotoUploadCtrl = async (req, res) => {
    console.log(req.file);
    try {
        //Find the user to be updated
        const userToUpdate = await User.findById(req.userAuth);
        //Check if user is found
        if(!userToUpdate){
            return next(appErr("User not found", 403));
        }
        //check if user is blocked
        if(userToUpdate.isBlocked){
            return next(appErr("Action not allowed, your account is blocked", 403));
        }
        //check if a user is updating their photo
        if(req.file){
            //Update profile photo
            await User.findByIdAndUpdate(req.userAuth, {
                $set: {
                    profilePhoto: req.file.path,
                }
            },{
                new: true
            });
            res.json({
                status: "success",
                data: "Profile Photo Uploaded"
            });
        }
    } catch (error) {
        next(appErr(error.message, 500));
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
    whoViewedMyProfileCtrl
}