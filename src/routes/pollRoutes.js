const express = require('express');
const {
  createPoll,
  votePoll,
  getAllPolls,
  getPollDetails,
  updatePoll,
  deletePoll,
} = require('../controllers/pollController');
const { authMiddleware } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // Assuming roleMiddleware is similar to the one in the incident example

const router = express.Router();

router.post('/create', authMiddleware, createPoll);

router.post('/vote', authMiddleware, votePoll);

router.get('/', getAllPolls);

router.get('/:pollId', getPollDetails);

router.patch('/:pollId', authMiddleware, roleMiddleware('ADMIN'), updatePoll);

router.delete('/:pollId', authMiddleware, roleMiddleware('ADMIN'), deletePoll);

module.exports = router;
