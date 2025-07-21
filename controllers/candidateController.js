const Candidate = require('../models/Candidate');

// @desc    Register a new candidate
// @route   POST /api/candidates/register
// @access  Admin
const registerCandidate = async (req, res) => {
  try {
    const { name, email, party, region } = req.body;

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ msg: 'Candidate already registered.' });
    }

    const newCandidate = new Candidate({ name, email, party, region });
    await newCandidate.save();

    res.status(201).json({ success: true, data: newCandidate });
  } catch (err) {
    console.error('Error registering candidate:', err);
    res.status(500).json({ msg: 'Server error during candidate registration' });
  }
};

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Admin, User
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ success: true, data: candidates });
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ msg: 'Server error fetching candidates' });
  }
};

// @desc    Get a specific candidate by ID
// @route   GET /api/candidates/:id
// @access  Admin, User
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    res.status(200).json({ success: true, data: candidate });
  } catch (err) {
    console.error('Error fetching candidate by ID:', err);
    res.status(500).json({ msg: 'Server error fetching candidate' });
  }
};

// @desc    Update candidate details
// @route   PUT /api/candidates/:id
// @access  Admin
const updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ msg: 'Candidate not found for update' });
    }

    res.status(200).json({ success: true, data: updatedCandidate });
  } catch (err) {
    console.error('Error updating candidate:', err);
    res.status(500).json({ msg: 'Server error updating candidate' });
  }
};

// @desc    Delete a candidate
// @route   DELETE /api/candidates/:id
// @access  Admin
const deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!deletedCandidate) {
      return res.status(404).json({ msg: 'Candidate not found for deletion' });
    }

    res.status(200).json({ success: true, msg: 'Candidate deleted successfully' });
  } catch (err) {
    console.error('Error deleting candidate:', err);
    res.status(500).json({ msg: 'Server error deleting candidate' });
  }
};

module.exports = {
  registerCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
};
