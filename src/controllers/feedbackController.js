const prisma = require("../config/prisma");

createTopic = async (req, res) => {
  try {
    const { title, description } = req.body;
    const topic = await prisma.topic.create({
      data: { title, description },
    });
    res.status(201).json({ success: true, topic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

getTopics = async (req, res) => {
  try {
    const topics = await prisma.topic.findMany({
      include: { feedbacks: true },
    });
    res.status(200).json({ success: true, topics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

submitFeedback = async (req, res) => {
  try {
    const { message, topicId } = req.body;
    const userId = req.user.userId;

    // Ensure all required fields are provided
    if (!message || !topicId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Message and topicId are required.",
        });
    }

    // Check if the topic exists
    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return res
        .status(404)
        .json({ success: false, message: "Topic not found" });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const feedback = await prisma.feedback.create({
      data: {
        message,
        userId,
        topicId,
      },
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

getFeedbackForTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const feedback = await prisma.feedback.findMany({
      where: { topicId: parseInt(topicId) },
      include: { user: true },
    });

    res.status(200).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTopic,
  getTopics,
  submitFeedback,
  getFeedbackForTopic,
};
