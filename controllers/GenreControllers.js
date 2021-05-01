const Genre = require('../models/Genre');
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

    addGenre: async (req, res) => {
        const { genre_name } = req.body;

        try {
            const genreInsert = await Genre.create({
                genreName: genre_name
            });

            const genreInsertResponse = {
                id: genreInsert._id,
                genre_name: genreInsert.genreName,
            }

            const response = formatter.ResponseFormatter('success', 'success add genre', 200, genreInsertResponse);
            res.status(200).json(response);
        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'failed add genre', 422, null);
            res.status(422).json(response);
        }
    },

    listGenre: async (req, res) => {
        try {
            const genreQuery = await Genre.find();

            let listGenre = [];

            genreQuery.forEach(genre => {
                let temp = {
                    id: genre._id,
                    genre_name: genre.genreName
                };

                listGenre.push(temp);
            })

            const response = formatter.ResponseFormatter('success', 'success fetch genre', 200, listGenre);
            res.status(200).json(response);
        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'failed add genre', 422, null);
            res.status(422).json(response);
        }
    },

    editGenre: async (req, res) => {
        try {
            const { genre_name } = req.body;
            const { id } = req.params;

            console.log(id);

            let genreSearch = await Genre.findOne({ '_id': id }, function (err) {
                if (err) {
                    const response = formatter.ResponseFormatter('failed', 'data genre not found!', 404, null);
                    res.status(404).json(response);
                }
            });

            let genreUpdated = await Genre.updateOne({ '_id': id }, { 'genreName': genre_name });

            const response = formatter.ResponseFormatter('success', 'success edit genre', 200, null);
            res.status(200).json(response);

        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'something error!', 422, null);
            res.status(422).json(response);
        }
    },

    deletedGenre: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedGenre = await Genre.deleteOne({ 'id': id }, function (err) {
                if (err) {
                    const response = formatter.ResponseFormatter('failed', 'data genre not found!', 404, null);
                    res.status(404).json(response);
                }
            });

            const response = formatter.ResponseFormatter('success', 'success deleted genre', 200, null);
            res.status(200).json(response);
        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'something error!', 422, null);
            res.status(422).json(response);
        }
    }

}