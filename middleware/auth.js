const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_key = process.env.JWT_KEY;

module.exports = {
    validateToken: async (req, res, next) => {
        try {
            const tokenGet = req.headers.authorization;
            const token = tokenGet.split(" ");

            jwt.verify(token[1], jwt_key, function (err, decoded) {

                if (err) {
                    const response = formatter.ResponseFormatter('failed', 'login failed', 401, { err });
                    res.status(401).json(response);
                } else {
                    req.userAuth = decoded;
                    next();
                }

            })
        } catch (error) {
            console.log(error);
        }
    }
}