const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get token form header
  const token = req.header('x-auth-token');

  // Check token
  if (!token) {
    return res.status(401).json({ message: '토큰이 존재하지 않습니다' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jsonwebtokenSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: '토큰이 유효하지 않습니다' });
  }
};
