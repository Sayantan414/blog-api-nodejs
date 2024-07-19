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
        res.json({
            status: "success",
            data: "Profile Photo Upload"
        });
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    allUsersCtrl,
    profileUserCtrl,
    deleteUserCtrl,
    updateUserCtrl,
    profilePhotoUploadCtrl
}