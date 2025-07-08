const User = require('../models/User');

// Get the current logged-in user's profile
exports.getProfile = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware and typically contains userId
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

// Update the current logged-in user's profile
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = {};
    // Allow updating only certain fields
    if (req.body.name) updates.name = req.body.name;
    if (req.body.region) updates.region = req.body.region;
    // Add more fields as needed

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true, runValidators: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    next(err);
  }
};