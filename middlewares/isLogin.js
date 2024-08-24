const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);
    // console.log(decodedUser.id);
    req.userAuth = decodedUser.id;
    if (!decodedUser) {
        return next(appErr("Invalid/Expired token, please login back", 500))
    } else {
        next();
    }
}

module.exports = isLogin;