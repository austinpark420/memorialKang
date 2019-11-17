const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Video = require('../../models/Video');

// @route   GET api/videos
// @desc    Get video list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    res.json(videos);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   Post api/videos
// @desc    Add video
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('category', '카테고리를 선택해 주세요')
        .not()
        .isEmpty(),
      check('content', '유튜브 영상 url을 입력해 주세요')
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

      const { category, content } = req.body;

      const newVideo = new Video({
        writer: user.name,
        category: category,
        content: content
      });
      await newVideo.save();

      const videos = await Video.find().sort({ date: -1 });

      res.json(videos);
    } catch (error) {
      console.log('**Video errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// // @route    DELETE api/videos/:id
// // @desc     Delete a post
// // @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: '영상이 존재하지 않습니다.' });
    }

    await video.remove();

    const videos = await Video.find().sort({ date: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '영상이 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
