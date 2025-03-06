const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const { COOKIE_NAME } = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.cookies[COOKIE_NAME] || req.headers['authorization']?.split(' ')[1];


  if (!token) {
    return res.status(403).json({ message: 'Unauthorized. No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    
    next();
  });
};

module.exports = { authMiddleware };
