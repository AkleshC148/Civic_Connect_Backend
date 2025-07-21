const User = require('../models/User');
const Candidate = require('../models/Candidate');
const Region = require('../models/Region');

// ---------------------------
// GET /admin/users
// Get list of all registered users
// ---------------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

// ---------------------------
// GET /admin/candidates
// Get all candidates for approval/review
// ---------------------------
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate('user', 'name email');
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Server error while fetching candidates' });
  }
};

// ---------------------------
// PUT /admin/candidates/:id/approve
// Approve a candidate by ID
// ---------------------------
exports.approveCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    candidate.status = 'approved';
    await candidate.save();

    res.json({ message: 'Candidate approved successfully', candidate });
  } catch (error) {
    console.error('Error approving candidate:', error);
    res.status(500).json({ message: 'Server error while approving candidate' });
  }
};

// ---------------------------
// PUT /admin/candidates/:id/reject
// Reject a candidate by ID
// ---------------------------
exports.rejectCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    candidate.status = 'rejected';
    await candidate.save();

    res.json({ message: 'Candidate rejected successfully', candidate });
  } catch (error) {
    console.error('Error rejecting candidate:', error);
    res.status(500).json({ message: 'Server error while rejecting candidate' });
  }
};

// ---------------------------
// POST /admin/regions
// Create a new region/ward
// ---------------------------
exports.createRegion = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Check if region already exists
    const existing = await Region.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Region already exists' });

    const newRegion = new Region({ name, code });
    await newRegion.save();

    res.status(201).json({ message: 'Region created successfully', region: newRegion });
  } catch (error) {
    console.error('Error creating region:', error);
    res.status(500).json({ message: 'Server error while creating region' });
  }
};

// ---------------------------
// GET /admin/regions
// Get list of all regions/wards
// ---------------------------
exports.getAllRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ message: 'Server error while fetching regions' });
  }
};

// ---------------------------
// PUT /admin/regions/:id
// Update region details
// ---------------------------
exports.updateRegion = async (req, res) => {
  try {
    const regionId = req.params.id;
    const { name, code } = req.body;

    const region = await Region.findById(regionId);
    if (!region) return res.status(404).json({ message: 'Region not found' });

    region.name = name || region.name;
    region.code = code || region.code;

    await region.save();
    res.json({ message: 'Region updated successfully', region });
  } catch (error) {
    console.error('Error updating region:', error);
    res.status(500).json({ message: 'Server error while updating region' });
  }
};

// ---------------------------
// DELETE /admin/regions/:id
// Delete a region
// ---------------------------
exports.deleteRegion = async (req, res) => {
  try {
    const regionId = req.params.id;

    const region = await Region.findById(regionId);
    if (!region) return res.status(404).json({ message: 'Region not found' });

    await region.remove();
    res.json({ message: 'Region deleted successfully' });
  } catch (error) {
    console.error('Error deleting region:', error);
    res.status(500).json({ message: 'Server error while deleting region' });
  }
};
