const User = require("../model/User/User");
const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);

    req.userAuth = decodedUser.id;

    const user = await User.findById(decodedUser.id);

    if (user.isAdmin) {
        return next();
    } else {
        return next(appErr("Access Denied", 403));
    }
}

module.exports = isAdmin;