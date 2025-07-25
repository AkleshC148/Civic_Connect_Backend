const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const {
  registerCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} = require('../controllers/candidateController');

// ✅ Register a new candidate (only Admin can do this)
router.post(
  '/register',
  authMiddleware,
  authorizeRoles('admin'),
  registerCandidate
);

// ✅ Get all candidates (both Admin & Users can view)
router.get(
  '/',
  authMiddleware,
  authorizeRoles('admin', 'user'),
  getAllCandidates
);

// ✅ Get specific candidate by ID (both Admin & Users can view)
router.get(
  '/:id',
  authMiddleware,
  authorizeRoles('admin', 'user'),
  getCandidateById
);

// ✅ Update candidate info (only Admin can update)
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  updateCandidate
);

// ✅ Delete a candidate (only Admin can delete)
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  deleteCandidate
);

module.exports = router;
