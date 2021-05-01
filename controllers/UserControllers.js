const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// read key from env
const jwt_key = process.env.JWT_KEY;

module.exports = {
    addUser: async (req, res) => {

        const {
            username, name, email, password
        } = req.body;

        try {
            const users = await Users.create({
                username: username,
                name: name,
                email: email,
                password: await bcrypt.hash(password, 8),
                role: 0
            });

            const userResponse = {
                username: users.username,
                name: users.name,
                email: users.email
            }

            const response = formatter.ResponseFormatter('success', 'success add user data', 200, userResponse);
            res.status(200).json(response);
        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'failed add user data', 400, error);
            res.status(400).json(response);
        }
    },

    login: async (req, res) => {
        const {
            email, password
        } = req.body;

        try {
            // get data user from email
            const loginQuery = await Users.findOne({ 'email': email });

            bcrypt.compare(password, loginQuery.password, function (err, same) {
                if (same === true) {
                    // create token
                    const token = jwt.sign({ email: loginQuery.email, id: loginQuery._id }, jwt_key);

                    const response = formatter.ResponseFormatter('success', 'login success', 200, { token });
                    res.status(200).json(response);
                } else {
                    const error = 'username and password wrong!';
                    const response = formatter.ResponseFormatter('failed', 'login failed', 401, { error });
                    res.status(401).json(response);
                }
            });

        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'login failed', 422, error);
            res.status(422).json(response);
            return
        }
    }
}