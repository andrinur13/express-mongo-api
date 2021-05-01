const Artist = require('../models/Artist');
const formatter = require('../helpers/ResponseFormatter');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// read key from env
const jwt_key = process.env.JWT_KEY;

module.exports = {
    addArtist: async (req, res) => {
        const { artist_name, id_user } = req.body;

        // try {
        //     const newArtist = await Artist.create({
        //         artist_name: artist_name,
        //         user: id_user
        //     });

        //     console.log(newArtist);

        // } catch (error) {
        //     console.log('error gan serius!');
        // }

        console.log('yak');
    }

}
