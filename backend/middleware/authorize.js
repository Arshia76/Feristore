const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = async (req, res, next) => {
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(401).json({ msg: 'ابتدا باید وارد سایت شوید' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = await User.findById(decoded.user._id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'ابتدا وارد سایت شوید',
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ msg: 'شما ادمین نیستید' });
  }
};

module.exports = {
  authorize,
  admin,
};
