const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Notice = require('../../models/Notice');

// @route   GET api/notices
// @desc    Get notice list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/notices/:id
// @desc    Get notice by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    res.json(notice);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Notice not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Post api/notices
// @desc    Add notice
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty(),
      check('category', '카테고리를 선택해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('name');

      const { title, category, content, file, postNumber } = req.body;

      const newNotice = new Notice({
        title: title,
        writer: user.name,
        category: category,
        content: content,
        file: file,
        number: postNumber
      });
      console.log('newNotice', newNotice);

      const notice = await newNotice.save();

      res.json(notice);
    } catch (error) {
      console.log('**Notice errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   Put api/notices
// @desc    Edit notice
// @access  Private

router.put(
  '/',
  [
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty(),
      check('category', '카테고리를 선택해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let notice = await Notice.findById(req.body._id);

      const { title, category, content, file } = req.body;

      notice.title = title;
      notice.category = category;
      notice.content = content;
      notice.file = file;

      notice = await notice.save();

      res.json(notice);
    } catch (error) {
      console.log('**Notice errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/notices/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
    }

    await notice.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
