const express = require('express');
const adminController = require('../controllers/adminController');
const roleMiddleware = require('../middleware/roleMiddleware');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/promote', roleMiddleware('ADMIN'), adminController.promoteToAdmin);
router.get('/users', roleMiddleware('ADMIN'), adminController.getAllUsers);

module.exports = router;
