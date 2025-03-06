const prisma = require('../config/prisma');
const { JWT_SECRET } = require('../config/jwt');
const { sendEmail } = require('../services/notificationService');

const promoteToAdmin = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: 'ADMIN' },
    });

    await sendEmail(user.email, 'Role Update', 'You have been promoted to Admin.');

    res.status(200).json({ message: `User with ID ${userId} is now an Admin.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while promoting user to Admin.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

module.exports = {
  promoteToAdmin,
  getAllUsers,
};
