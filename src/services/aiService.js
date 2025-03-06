const axios = require('axios');

const getResponse = async (document, userMessage) => {
  try {
    const response = await axios.post('https://api.ai-platform.com/summarize', {
      documentText: document.content,
      userMessage,
    });

    return response.data.summary || 'AI could not generate a response.';
  } catch (error) {
    console.error(error);
    return 'An error occurred while interacting with the AI.';
  }
};

module.exports = { getResponse };
