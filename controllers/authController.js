const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, region } = req.body;
    if (!name || !email || !password || !region) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword, region });
    await user.save();

    const payload = { userId: user._id, region: user.region };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      msg: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, region: user.region }
    });
  } catch (err) {
    next(err);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id, region: user.region };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, region: user.region }
    });
  } catch (err) {
    next(err);
  }
};


exports.logoutUser = async (req, res, next) => {
  try {
    // If using HTTP-only cookies, clear cookie here.
    // For JWT stateless logout, just instruct client to discard token.
    res.status(200).json({ msg: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};