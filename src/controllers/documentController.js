const prisma = require('../config/prisma');
const path = require('path');
const fs = require('fs');

const uploadDocument = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File is required' });
  }

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {CitizenConnect360.pdf
    const filePath = path.join(__dirname, '../../uploads/doc', file.filename);

    const document = await prisma.document.create({
      data: {
        title,
        description,
        fileUrl: filePath,
        uploadedBy: req.user.userId, 
      },
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: document.id,
        title: document.title,
        description: document.description,
        fileUrl: document.fileUrl,
        uploadedBy: document.uploadedBy,
        createdAt: document.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading document' });
  }
};

const getDocumentById = async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await prisma.document.findUnique({
      where: { id: parseInt(documentId) },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ document });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching document' });
  }
};

const updateDocument = async (req, res) => {
  const { documentId } = req.params;
  const { title, description } = req.body;

  try {
    const document = await prisma.document.findUnique({
      where: { id: parseInt(documentId) },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: parseInt(documentId) },
      data: {
        title: title || document.title,
        description: description || document.description,
      },
    });

    res.status(200).json({
      message: 'Document updated successfully',
      document: updatedDocument,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating document' });
  }
};

const deleteDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await prisma.document.findUnique({
      where: { id: parseInt(documentId) },
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.join(__dirname, '../../uploads/doc', document.fileUrl.split('/uploads/')[1]);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.document.delete({
      where: { id: parseInt(documentId) },
    });

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting document' });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await prisma.document.findMany();

    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: 'No documents found' });
    }

    res.status(200).json({ documents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching documents' });
  }
};


module.exports = { getAllDocuments, uploadDocument, getDocumentById, updateDocument, deleteDocument };
