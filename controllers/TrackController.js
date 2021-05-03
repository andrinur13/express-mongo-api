const Track = require('../models/Track');
const Artist = require('../models/Artist');
const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// add multer middleware
const uploadMulter = require('../middleware/multer');

module.exports = {
    addTrack: async (req, res) => {
        const uploadSong = uploadMulter.uploadSong;
        uploadSong(req, res, function (err) {
            if (err) {
                // upload error
                const response = formatter.ResponseFormatter('failed', 'failed add new song', 422, err);
                res.status(422).json(response);
            } else {
                // upload success
                const { track_name, year, genre_id } = req.body;

                // find artist by id user login
                Artist.findOne({ 'user_id': req.userAuth.id }, function (err, docs) {
                    if (err) {
                        const response = formatter.ResponseFormatter('failed', 'failed add new song', 422, null);
                        res.status(422).json(response);
                    } else {
                        Track.create({
                            track_name: track_name,
                            year: year,
                            genre_id: genre_id,
                            artist_id: docs._id,
                            file_path: req.file.path
                        });

                        const dataResponse = {
                            track_name: 'To The Bone',
                            file_path: req.file.path,
                            track_name: track_name,
                            year: year,
                            arist_id: docs._id,
                            genre_id: genre_id
                        };
                        const response = formatter.ResponseFormatter('success', 'success add new song', 200, dataResponse);
                        res.status(200).json(response);
                    }
                })

            }
        });
    },

    listTrack: async (req, res) => {
        const listOfTracks = await Track.find(function (err, data) {
            if (err) {
                const response = formatter.ResponseFormatter('failed', 'failed fetch all song', 422, null);
                res.status(422).json(response);
            }

            let listTrackArray = [];
            data.forEach(songTrack => {
                const temp = {
                    id: songTrack._id,
                    track_name: songTrack.track_name,
                    year: songTrack.year,
                    genre_id: songTrack.genre_id,
                    artist_id: songTrack.artist_id,
                    file_path: songTrack.file_path
                    
                };
                listTrackArray.push(temp);

            })

            const response = formatter.ResponseFormatter('success', 'success fetch all song', 200, listTrackArray);
            res.status(200).json(response);
        });

    },

    editTrack: async (req, res) => {

    },

    deleteTrack: async (req, res) => {

    }
}