var express = require('express');
var router = express.Router();
const artistController = require('../controllers/ArtistController');
const middleware = require('../middleware/auth');

router.post('/artist', artistController.addArtist);

module.exports = router;
