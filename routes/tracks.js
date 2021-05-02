var express = require('express');
var router = express.Router();
const trackControler = require('../controllers/TrackController');
const middleware = require('../middleware/auth');

// routes
router.post('/track', middleware.validateToken, trackControler.addTrack);

module.exports = router;
