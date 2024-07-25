const express = require('express');
const { addFavorite, getFavorites } = require('../Controllers/favoritesController');
const { ensureLoggedIn } = require('../Middleware/authMiddleware');


const router = express.Router();

// @route  POST to api/favorites
// @desc   Add recipe to favorites
// access  Private
router.post('/', ensureLoggedIn, addFavorite);

// @route  GET to api/favorites
// @desc  Get user's favorite recipes
// @access Private
router.get('/', ensureLoggedIn, getFavorites);

module.exports = router;