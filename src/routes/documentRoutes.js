const express = require('express');
const { uploadDocument, getDocumentById, updateDocument, deleteDocument, getAllDocuments } = require('../controllers/documentController');
const upload = require('../middleware/fileUpload');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadDocument);

router.get('/', authMiddleware, getAllDocuments);

router.get('/:documentId', authMiddleware, getDocumentById);

router.patch('/:documentId', authMiddleware, updateDocument);

router.delete('/:documentId', authMiddleware, deleteDocument);

module.exports = router;
