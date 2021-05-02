const Track = require('../models/Track');
const Artist = require('../models/Artist');
const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// add multer middleware
const uploadMulter = require('../middleware/multer');

module.exports = {
    addTrack: async (req, res) => {
        let filepath = '';
        const uploadSong = uploadMulter.uploadSong;
        uploadSong(req, res, function (err) {
            if (err) {
                // upload error
                const response = formatter.ResponseFormatter('failed', 'failed add new song', 422, err);
                res.status(422).json(response);
            } else {
                // upload success
                filepath = req.file.path;
            }
        });

        // upload success
        const { track_name, year, genre_id } = req.body;
        // find artist by id user login
        const artistSearchByUserLogin = await Artist.findOne({'user_id': req.userAuth.id});

        console.log(artistSearchByUserLogin['_id']);

        const dataResponse = {
            song_name: 'To The Bone',
            file: filepath,
            track_name: track_name,
            year: year
        };

        const response = formatter.ResponseFormatter('success', 'success add new song', 200, dataResponse);
        res.status(200).json(response);
    },

    listTrack: async (req, res) => {

    },

    editTrack: async (req, res) => {

    },

    deleteTrack: async (req, res) => {

    }
}