const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

// Logout user (stateless, the client just discards token)
router.post('/logout', authController.logoutUser);

module.exports = router;