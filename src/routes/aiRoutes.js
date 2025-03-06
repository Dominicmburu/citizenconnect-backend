// routes/aiRoutes.js
const express = require('express');
const { chatWithAI } = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Chat with AI regarding a document
router.post('/chat', authMiddleware, chatWithAI);

module.exports = router;
