const aiService = require('../services/aiService');

const chatWithAI = async (req, res) => {
  const { documentId, userMessage } = req.body;

  try {
    const document = await prisma.document.findUnique({ where: { id: documentId } });
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const aiResponse = await aiService.getResponse(document, userMessage);
    res.json({ response: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interacting with AI' });
  }
};

module.exports = { chatWithAI };
