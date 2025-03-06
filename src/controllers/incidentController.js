const prisma = require('../config/prisma');
const path = require('path');

const createIncident = async (req, res) => {
  const { title, description, location } = req.body;
  const userId = req.user.userId;
  const file = req.file;

  try {
    let mediaUrl = null;
    if (file) {
      const mediaPath = path.join('/uploads/media', file.filename);
      mediaUrl = mediaPath;
    }

    const newIncident = await prisma.incident.create({
      data: {
        title,
        description,
        mediaUrl,
        location,
        status: 'reported', // Can be 'reported', 'under review', 'resolved',
        userId,
      },
    });
    res.status(201).json({ message: "Incident reported successfully" ,incident: newIncident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating incident' });
  }
};

const updateIncidentStatus = async (req, res) => {
  const { incidentId, status } = req.body;
  const { role } = req.user;

  if (role !== 'ADMIN' && role !== 'GOVERNMENT') {
    return res.status(403).json({ message: 'Forbidden: You do not have permission to update status' });
  }

  try {
    const updatedIncident = await prisma.incident.update({
      where: { id: incidentId },
      data: { status },
    });
    res.status(200).json({ message: 'Incident status updated', incident: updatedIncident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating incident status' });
  }
};

const deleteIncident = async (req, res) => {
  const { incidentId } = req.params;
  const { role } = req.user;

  if (role !== 'ADMIN' && role !== 'GOVERNMENT') {
    return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this incident' });
  }

  try {
    const deletedIncident = await prisma.incident.delete({
      where: { id: parseInt(incidentId) },
    });
    res.status(200).json({ message: 'Incident deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting incident' });
  }
};

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany();
    res.status(200).json({ incidents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching incidents' });
  }
};

const getIncidentById = async (req, res) => {
  const { incidentId } = req.params;

  try {
    const incident = await prisma.incident.findUnique({
      where: { id: parseInt(incidentId) },
    });

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.status(200).json({ incident });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching the incident' });
  }
};

module.exports = {
  createIncident,
  updateIncidentStatus,
  deleteIncident,
  getAllIncidents,
  getIncidentById,
};
