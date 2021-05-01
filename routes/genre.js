var express = require('express');
var router = express.Router();
const genreControllers = require('../controllers/GenreControllers');
const middleware = require('../middleware/auth');

router.post('/genre', middleware.validateToken, genreControllers.addGenre);
router.get('/genre', genreControllers.listGenre);
router.put('/genre', genreControllers.editGenre);

module.exports = router;
