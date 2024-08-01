const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controllers/authController');

// create new router instance
const router = express.Router();

// @route  POST request to 'api/auth/register'
// desc    Register user
// @access  Public
router.post('/auth/register', authController.register);

// @route  POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/auth/login', authController.login);

module.exports = router;
