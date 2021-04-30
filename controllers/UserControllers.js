const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const formatter = require('../helpers/ResponseFormatter');

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

            console.log('Berhasil menambahkan users');
            console.log(users);

            const response = await formatter.ResponseFormatter('success', 'success add user data', 200, userResponse);
            res.status(200).json(response);
        } catch (error) {
            const response = await formatter.ResponseFormatter('failed', 'failed add user data', 400, null);
            res.status(400).json(response);
        }
    }
}