const Volunteer = require('../models/Volunteer');
const Candidate = require('../models/Candidate');
const User = require('../models/User');

// Create new volunteer
exports.createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, availability, candidateName, isForAdmin } = req.body;

    let candidateId = null;

    if (!isForAdmin && candidateName) {
      const candidate = await Candidate.findOne({ name: candidateName });
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      candidateId = candidate._id;
    }

    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      availability,
      candidateId: isForAdmin ? null : candidateId
    });

    const saved = await newVolunteer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error creating volunteer', details: err.message });
  }
};

// Get all volunteers (optional filtering)
exports.getAllVolunteers = async (req, res) => {
  try {
    const { candidateId, status } = req.query;

    const query = {};
    if (candidateId) query.candidateId = candidateId;
    if (status) query.status = status;

    const volunteers = await Volunteer.find(query).populate('candidateId', 'name');
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching volunteers', details: err.message });
  }
};

// Update volunteer status (approve/reject)
exports.updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedBy } = req.body; // approvedBy = admin/candidate userId

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await Volunteer.findByIdAndUpdate(
      id,
      { status, approvedBy },
      { new: true }
    ).populate('approvedBy', 'name email');

    if (!updated) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating volunteer status', details: err.message });
  }
};
