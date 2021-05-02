var express = require('express');
var router = express.Router();
const artistController = require('../controllers/ArtistController');
const middleware = require('../middleware/auth');

router.post('/artist', middleware.validateToken, artistController.addArtist);
router.get('/artist', artistController.listArtist);
router.put('/artist', middleware.validateToken, artistController.editArtist);

module.exports = router;
