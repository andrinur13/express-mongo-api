const Artist = require('../models/Artist');
const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    addArtist: async (req, res) => {
        const { artist_name } = req.body;

        try {
            console.log(req.userAuth.id);

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
    }

}
