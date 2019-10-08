const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Confirm auth
// @access  Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Sever Error' });
  }
});

// @route   Post api/auth
// @desc    login & get token
// @access  Public

router.post(
  '/',
  [
    check('name', 'Please include a valid name').exists(),
    check('password', 'Please include a valid password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      // Check user name
      const user = await User.findOne({ name });

      if (!user) {
        res
          .status(400)
          .json({ errors: [{ message: '아이디를 다시 확인하세요.' }] });
      }

      // Check user password

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res
          .status(400)
          .json({ errors: [{ message: '비밀번호를 다시 확인하세요.' }] });
      }

      // return jsonwebtoken

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        config.get('jsonwebtokenSecret'),
        { expiresIn: 3600000 },
        (errors, token) => {
          if (errors) throw errores;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Sever Error' });
    }
  }
);

module.exports = router;
