var config = require('./config');
var jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    try {
        var token = req.headers.authorization
        jwt.verify(token, config.KEY, (error, decoded) => {
            if (error) {
                return res.status(401);
            } else {
                req.auth = {  };
                req.auth.decoded=decoded
                next();

            }
        });
        res.send(token);
    } catch (error) {
        res.send('error');
    }

}
module.exports = authentication