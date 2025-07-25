const User = require("../models/User");
// const Region = require("../models/Region"); // Region not used right now

// GET: Admin Dashboard Overview
exports.getOverviewCounts = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const volunteerCount = await User.countDocuments({ role: "volunteer" });
    const candidateCount = await User.countDocuments({ role: "candidate" });

    res.status(200).json({
      totalUsers: userCount,
      totalVolunteers: volunteerCount,
      totalCandidates: candidateCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching overview counts", error: err });
  }
};

// GET: All users for user management table
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role status createdAt");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

// PATCH: Update a user's role (admin action)
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { newRole } = req.body;

  try {
    const validRoles = ["user", "candidate", "volunteer", "admin"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role: newRole }, { new: true });
    res.status(200).json({ message: "User role updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user role", error: err });
  }
};

// PATCH: Update a user's status (admin action)
exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    const validStatuses = ["active", "pending verification", "suspended"];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    res.status(200).json({ message: "User status updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user status", error: err });
  }
};
