const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

const requireAdmin = [authMiddleware, authorizeRoles('admin')];
console.log('authMiddleware:', typeof authMiddleware);
console.log('authorizeRoles("admin"):', typeof authorizeRoles("admin"));
console.log('adminController.getOverview:', typeof adminController.getOverviewCounts);



/**
 * ADMIN OVERVIEW
 * - Dashboard counts (total users, candidates, volunteers, etc.)
 */
router.get('/overview', ...requireAdmin, adminController.getOverviewCounts);

/**
 * USER MANAGEMENT
 */
router.get('/users', ...requireAdmin, adminController.getAllUsers);
router.patch('/users/:id/role', ...requireAdmin, adminController.updateUserRole);
router.patch('/users/:id/status', ...requireAdmin, adminController.updateUserStatus);

/**
 * CANDIDATE MANAGEMENT
 */
// router.get('/candidates', ...requireAdmin, adminController.getAllCandidates);
// router.put('/candidates/:id/approve', ...requireAdmin, adminController.approveCandidate);
// router.put('/candidates/:id/reject', ...requireAdmin, adminController.rejectCandidate);

/**
 * REGION / WARD MANAGEMENT (Commented out for now)
 */
// router.post('/regions', ...requireAdmin, adminController.createRegion);
// router.get('/regions', ...requireAdmin, adminController.getAllRegions);
// router.put('/regions/:id', ...requireAdmin, adminController.updateRegion);
// router.delete('/regions/:id', ...requireAdmin, adminController.deleteRegion);

module.exports = router;
