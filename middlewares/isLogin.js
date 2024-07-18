const getTokenFromHeader = require("../utils/getTokenFromHeader");

const isLogin = (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        return res.json({
            message: "There is no token attached to the header"
        })
    } else {
        next();
    }
}

module.exports = isLogin;