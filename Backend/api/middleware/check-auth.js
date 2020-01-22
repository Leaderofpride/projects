const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        //Split the form of token
        const bearer = bearerHeader.split(' '); // Bearer - {0}, <access_token> - {1}
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};