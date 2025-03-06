const prisma = require('../config/prisma');

const createPoll = async (req, res) => {
  const { question, options, type, endDate } = req.body;

  try {
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: 'Poll must have at least two options' });
    }

    if (!endDate || isNaN(new Date(endDate))) {
      return res.status(400).json({ message: 'Invalid end date' });
    }

    const now = new Date();
    if (new Date(endDate) <= now) {
      return res.status(400).json({ message: 'End date must be in the future' });
    }

    const newPoll = await prisma.poll.create({
      data: {
        question,
        options,
        type: type || "radio",
        votes: new Array(options.length).fill(0),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json({ message: 'Poll created successfully', poll: newPoll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating poll' });
  }
};

const votePoll = async (req, res) => {
  const { pollId, optionIndex } = req.body;
  const userId = req.user.userId;
  
  try {
    const poll = await prisma.poll.findUnique({
      where: { id: parseInt(pollId) },
    });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const now = new Date();
    if (now > new Date(poll.endDate)) {
      return res.status(400).json({ message: "Poll has expired and voting is not allowed" });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: "Invalid option selected" });
    }

    if (poll.voters.includes(userId)) {
      return res.status(400).json({ message: "You have already voted in this poll" });
    }

    let updatedVotes = [...poll.votes];

    if (poll.type === "radio") {
      updatedVotes[optionIndex] += 1;
    } else if (poll.type === "checkbox") {
      optionIndex.forEach((index) => {
        if (index >= 0 && index < poll.options.length) {
          updatedVotes[index] += 1;
        }
      });
    }

    const updatedPoll = await prisma.poll.update({
      where: { id: pollId },
      data: {
        votes: { set: updatedVotes },
        voters: { set: [...poll.voters, userId] },
      },
    });

    return res.status(200).json({ message: "Successfully Voted", poll: updatedPoll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error voting on poll" });
  }
};



const getAllPolls = async (req, res) => {
  try {
    const polls = await prisma.poll.findMany();

    const pollsWithParticipants = polls.map(poll => {
      const numParticipants = poll.votes.reduce((acc, vote) => acc + vote, 0); // Sum of votes
      return {
        ...poll,
        numParticipants,
      };
    });

    res.status(200).json({ polls: pollsWithParticipants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching polls' });
  }
};


const getPollDetails = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await prisma.poll.findUnique({
      where: { id: parseInt(pollId) },
    });

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    res.status(200).json({ poll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching poll details' });
  }
};

const updatePoll = async (req, res) => {
  const { pollId } = req.params;
  const { question, options, endDate } = req.body;

  try {
    const poll = await prisma.poll.findUnique({
      where: { id: parseInt(pollId) },
    });

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const now = new Date();
    if (now > new Date(poll.endDate)) {
      return res.status(400).json({ message: 'Poll has already expired and cannot be updated' });
    }

    if (options && options.length < 2) {
      return res.status(400).json({ message: 'Poll must have at least two options' });
    }

    if (endDate && isNaN(new Date(endDate))) {
      return res.status(400).json({ message: 'Invalid end date' });
    }

    if (endDate && new Date(endDate) <= now) {
      return res.status(400).json({ message: 'End date must be in the future' });
    }

    const updatedPoll = await prisma.poll.update({
      where: { id: parseInt(pollId) },
      data: {
        question: question || poll.question,  // Only update if provided
        options: options || poll.options,     // Only update if provided
        endDate: endDate ? new Date(endDate) : poll.endDate, // Only update endDate if provided
      },
    });

    res.status(200).json({ poll: updatedPoll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating poll' });
  }
};


const deletePoll = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await prisma.poll.findUnique({
      where: { id: parseInt(pollId) },
    });

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    await prisma.poll.delete({
      where: { id: parseInt(pollId) },
    });

    res.status(200).json({ message: 'Poll deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting poll' });
  }
};

module.exports = {
  createPoll,
  votePoll,
  getAllPolls,
  getPollDetails,
  updatePoll,
  deletePoll,
};
