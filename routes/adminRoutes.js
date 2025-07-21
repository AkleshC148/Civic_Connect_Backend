const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

// Middleware stack for admin-only access
const requireAdmin = [authMiddleware, roleMiddleware('admin')];

/**
 * USERS MANAGEMENT
 * - View all users
 * - (Optional) filter by region, role, etc.
 */
router.get('/users', requireAdmin, adminController.getAllUsers);

/**
 * CANDIDATE MANAGEMENT
 * - View all candidates
 * - Approve or reject a candidate application
 */
router.get('/candidates', requireAdmin, adminController.getAllCandidates);
router.put('/candidates/:id/approve', requireAdmin, adminController.approveCandidate);
router.put('/candidates/:id/reject', requireAdmin, adminController.rejectCandidate);

/**
 * REGION / WARD MANAGEMENT
 * - Create, view, update, or delete regional units
 */
router.post('/regions', requireAdmin, adminController.createRegion);
router.get('/regions', requireAdmin, adminController.getAllRegions);
router.put('/regions/:id', requireAdmin, adminController.updateRegion);
router.delete('/regions/:id', requireAdmin, adminController.deleteRegion);

module.exports = router;
