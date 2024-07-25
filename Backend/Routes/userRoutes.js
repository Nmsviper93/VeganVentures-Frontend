const express = require('express');
const router = express.Router();
const { 
    getUserProfile, 
    getCurrentUserProfile, 
    updateUserProfile, 
    updateCurrentUserProfile, 
    changePassword 
} = require('../controllers/userController');
const { ensureLoggedIn } = require('../Middleware/authMiddleware');
const User = require('../Models/modelsUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access denied' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Endpoint to refresh JWT token
router.post('/refresh-token', verifyToken, (req, res) => {
    const token = req.body.token;

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        const newToken = jwt.sign({ id: verified.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token: newToken });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
});

// Routes
router.get('/profile', ensureLoggedIn, getCurrentUserProfile); // For authenticated users
router.put('/profile', ensureLoggedIn, updateCurrentUserProfile); // For authenticated users
router.put('/password', ensureLoggedIn, changePassword);
router.get('/:id', ensureLoggedIn, getUserProfile); // By user ID
router.put('/:id', ensureLoggedIn, updateUserProfile); // By user ID

// Endpoint to remove recipe from user's favorites
router.delete('/favorites/:id', ensureLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.favorites = user.favorites.filter(favId => favId.toString() !== req.params.id);
        await user.save();

        res.json({ message: 'Favorite removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

