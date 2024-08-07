const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { verifyToken } = require('../Middleware/authMiddleware');

// create new router instance
const router = express.Router();

// @route  POST request to 'api/auth/register'
// desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route  POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route  GET api/auth/check-status
// @desc   Check authentication status
// @access Private
router.get('/check-status', verifyToken, authController.checkStatus);

module.exports = router;
