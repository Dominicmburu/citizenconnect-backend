const express = require('express');
const {
  createIncident,
  updateIncidentStatus,
  deleteIncident,
  getAllIncidents,
  getIncidentById,
} = require('../controllers/incidentController');
const uploadMedia = require('../middleware/mediaUpload'); 
const { authMiddleware } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, uploadMedia.single('media'), createIncident);  // 'media' is the fieldname for the file in the form

router.patch('/update-status', authMiddleware, roleMiddleware('ADMIN'), updateIncidentStatus);

router.delete('/delete/:incidentId', authMiddleware, roleMiddleware('ADMIN'), deleteIncident);

router.get('/', getAllIncidents);

router.get('/:incidentId', getIncidentById);

module.exports = router;
