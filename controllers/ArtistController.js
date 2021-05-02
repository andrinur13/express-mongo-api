const Artist = require('../models/Artist');
const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    addArtist: async (req, res) => {
        const { artist_name } = req.body;

        try {

            const newArtist = await Artist.create({
                artist_name: artist_name,
                user_id: req.userAuth.id
            });

            const responseArtist = {
                artist_name: newArtist.artist_name
            };

            const response = formatter.ResponseFormatter('success', 'success add artist data', 200, responseArtist);
            res.status(200).json(response);
        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'failed add user data', 400, error);
            res.status(400).json(response);
        }

    },

    listArtist: async (req, res) => {

        try {
            const artistQuery = await Artist.find({});

            let artistData = [];

            artistQuery.forEach(artist => {
                let temp = {
                    id: artist._id,
                    artist_name: artist.artist_name
                };

                artistData.push(temp);
            });

            const response = formatter.ResponseFormatter('success', 'success fetch artist data', 200, artistData);
            res.status(200).json(response);

        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'failed add artist data', 400, error);
            res.status(400).json(response);
        }
    },

    editArtist: async (req, res) => {
        try {
            // find artist
            const user_id = req.userAuth.id;

            const artistQuery = await Artist.find({ 'user_id': user_id }, function (error) {
                if (error) {
                    const response = formatter.ResponseFormatter('failed', 'data artist not found!', 404, null);
                    res.status(404).json(response);
                }
            });

            const { artist_name } = req.body;

            const editedArtist = await Artist.updateOne({ 'user_id': user_id }, { 'artist_name': artist_name }, function (err) {
                if (err) {
                    const response = formatter.ResponseFormatter('failed', 'failed update data artist!', 422, err);
                    res.status(422).json(response);
                }
            });

            const response = formatter.ResponseFormatter('success', 'success edit artist', 200, null);
            res.status(200).json(response);

        } catch (error) {
            const response = formatter.ResponseFormatter('failed', 'failed add artist data', 400, error);
            res.status(400).json(response);
        }
    },

    deleteArtist: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedArtist = await Artist.deleteOne({ '_id': id }, function (err) {
                if (err) {
                    const response = formatter.ResponseFormatter('failed', 'failed to deleted artist', 422, null);
                    res.status(422).json(response);
                } else {
                    const response = formatter.ResponseFormatter('success', 'success to deleted artist', 200, null);
                    res.status(200).json(response);
                }
            });
        } catch (err) {
            const response = formatter.ResponseFormatter('failed', 'failed to deleted artist', 422, err);
            res.status(422).json(response);
        }
    }

}
