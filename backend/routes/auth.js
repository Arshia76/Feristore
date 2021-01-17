const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();
const router = express.Router();
const { authorize } = require('../middleware/authorize');

//Register

router.post(
  '/register',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('لطفا نام کاربری را وارد کنید.'),
    check('email').isEmail().withMessage('لطفا ایمیل معتبری وارد کنید.'),
    check('password')
      .isLength({
        min: 6,
      })
      .withMessage('کلمه عبور باید حداقل 6 کلمه باشد.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        res.status(400).json({
          msg: 'کاربر با این ایمیل وجود دارد.',
        });
      }

 let user1 = await User.findOne({
        username,
      });
      if (user1) {
        res.status(400).json({
          msg: 'کاربر با این نام کاربری وجود دارد.',
        });
      }



      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      jwt.sign(
        { user },
        process.env.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({
            token,
            username,
            id: user._id,
            isAdmin: user.isAdmin,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('خطای سرور');
    }
  }
);

// login
router.post(
  '/login',
  [
    check('email', 'ایمیل صحیحی را وارد کنید').isEmail(),
    check('password', 'کلمه عبور را وارد کنید').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (!user) {
        res.status(400).json({
          msg: 'کاربری با این مشخصات وجود ندارد.',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({
          msg: 'کاربری با این مشخصات وجود ندارد.',
        });

      await user.save();

      jwt.sign(
        { user },
        process.env.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({
            id: user._id,
            username: user.username,
            token,
            isAdmin: user.isAdmin,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('خطای سرور');
    }
  }
);

router.get('/user', authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res
      .status(200)
      .json({ user: user.username, id: user._id, isAdmin: user.isAdmin });
  } catch (err) {
    return res.status(400).json({ msg: 'ابتدا وارد سایت شوید' });
  }
});

module.exports = router;
