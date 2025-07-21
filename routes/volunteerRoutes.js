const express = require('express');
const router = express.Router();

const volunteerController = require('../controllers/volunteerController');

// @route   POST /api/volunteers
// @desc    Create a new volunteer (for admin or candidate)
// @access  Public
router.post('/', volunteerController.createVolunteer);

// @route   GET /api/volunteers
// @desc    Get all volunteers (filter by status or candidateId optionally)
// @access  Admin or Candidate
router.get('/', volunteerController.getAllVolunteers);

// @route   PATCH /api/volunteers/:id/status
// @desc    Approve or reject a volunteer
// @access  Admin or Candidate
router.patch('/:id/status', volunteerController.updateVolunteerStatus);

module.exports = router;
