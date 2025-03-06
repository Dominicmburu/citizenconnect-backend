const express = require('express');
const router = express.Router();
const { createTopic, getTopics, submitFeedback, getFeedbackForTopic } = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/topics', authMiddleware, roleMiddleware('ADMIN'), createTopic);

router.get('/topics', getTopics);

router.post('/feedback', authMiddleware, submitFeedback);

router.get('/feedback/:topicId', getFeedbackForTopic);

module.exports = router;
