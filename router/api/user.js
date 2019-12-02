const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/user
// @desc    Register user
// @access  Public

router.post(
  '/',
  [
    check('name', '이름을 입력해 주세요')
      .not()
      .isEmpty(),
    check('email', '이메일을 입력해 주세요').isEmail(),
    check('password', '4글자 이상의 비밀번호를 입력해 주세요').isLength({
      min: 4
    })
  ],
  async (req, res) => {
    // check req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user name exists
      let user = await User.findOne({ name });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: '등록된 ID입니다' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('user', user);

      // Return jsonwebtoken

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        config.get('jsonwebtokenSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

module.exports = router;
