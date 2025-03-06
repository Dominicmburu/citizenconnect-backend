const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const { COOKIE_NAME } = require('../config/config');
const prisma = require("../config/prisma");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies[COOKIE_NAME] || req.headers['authorization']?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Authentication required' });

      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'You do not have permission to proceed' });
      }

      req.user = user; 
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during role validation' });
    }
  };
};

module.exports = roleMiddleware;
