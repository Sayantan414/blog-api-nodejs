const User = require("../../model/User/User")

const userRegisterCtrl = async (req, res) => {
    console.log(req.body);
    try {
        res.json({
            status: "success",
            data: "user registered"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const userLoginCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "user login"
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
        res.json({
            status: "success",
            data: "profile route"
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

module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    allUsersCtrl,
    profileUserCtrl,
    deleteUserCtrl,
    updateUserCtrl
}