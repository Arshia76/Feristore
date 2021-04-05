const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { authorize, admin } = require('../middleware/authorize');
const { check, validationResult } = require('express-validator');
const paginatedResults = require('../middleware/pagination');

router.get('/', authorize, admin, paginatedResults(User), async (req, res) => {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/:id', authorize, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.put(
  '/:id/update',
  authorize,
  [
    check('username').not().isEmpty().withMessage('نام کاربری را وارد کنید'),
    check('email').not().isEmpty().withMessage('ایمیل را وارد کنید'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { username, email } = req.body;

      if (req.body.password) {
        const user = await User.findById(req.params.id);
        const newUser = new User({
          username,
          email,
        });
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch)
          return res.status(400).json({
            msg: 'رمز عبور اشتباه است',
          });

        if (!req.body.newPassword) {
          return res.status(400).json({ msg: 'رمز جدید را وارد کنید' });
        }

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(req.body.newPassword, salt);
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
          },
          { new: true }
        );
        return res
          .status(200)
          .json({ updatedUser, msg: 'با موفقیت بروز رسانی شد' });
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username,
          email,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ updatedUser, msg: 'با موفقیت بروز رسانی شد' });
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.delete('/:id/delete', authorize, async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    return res
      .status(200)
      .json({ msg: 'کاربر با موفقیت حذف گردید.', id: user._id });
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
