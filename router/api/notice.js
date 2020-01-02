const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadFile = require('../../middleware/uploadFile');
const User = require('../../models/User');
const Notice = require('../../models/Notice');

// @route   GET api/notices
// @desc    Get notice list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ number: -1 });
    res.json(notices);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/notices/mainPosts
// @desc    Get notice list
// @access  Public

router.get('/mainPosts', async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ date: -1 })
      .limit(10);
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
    uploadFile,
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

      const { title, category, content, date } = req.body;

      let fileArray = req.files;

      let fileName;
      const originalnames = [];

      let fileLocation;
      const locations = [];

      let fileKey;
      const keys = [];

      for (let i = 0; i < fileArray.length; i++) {
        fileName = fileArray[i].originalname;
        originalnames.push(fileName);
        fileKey = fileArray[i].key;
        keys.push(fileKey);
        fileLocation = fileArray[i].location;
        locations.push(fileLocation);
      }

      // post number
      const notices = await Notice.find();
      const noticeNumber = notices.length ? notices.length + 1 : 1;

      const newNotice = new Notice({
        title: title,
        number: noticeNumber,
        writer: user.name,
        category: category,
        content: content,
        date: date,
        files: {
          locations,
          keys,
          originalnames
        }
      });

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
    uploadFile,
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

    let notice = await Notice.findById(req.body._id);
    if (!notice) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (notice.files.keys.length && notice.files.keys.length !== null) {
          let deleteNoticeKey = [];

          for (let i = 0; i < notice.files.keys.length; i++) {
            deleteNoticeKey.push({ Key: notice.files.keys[i] });
          }

          let params = {
            Bucket: 'memorialkang',
            Delete: {
              Objects: deleteNoticeKey
            }
          };

          s3.deleteObjects(params, function(err, data) {
            if (err) console.log('deleteObjects error: ', err, err.stack);
            else console.log('successful response: ', data);
          });
        }

        let fileName;
        const originalnames = [];

        let fileKey;
        const keys = [];

        let fileLocation;
        const locations = [];

        for (let i = 0; i < fileArray.length; i++) {
          fileName = fileArray[i].originalname;
          originalnames.push(fileName);
          fileKey = fileArray[i].key;
          keys.push(fileKey);
          fileLocation = fileArray[i].location;
          locations.push(fileLocation);
        }

        const { title, category, content } = req.body;

        notice.title = title;
        notice.category = category;
        notice.content = content;
        notice.files = {
          locations,
          keys,
          originalnames
        };

        notice = await notice.save();
      } else {
        const { title, category, content } = req.body;

        notice.title = title;
        notice.category = category;
        notice.content = content;

        notice = await notice.save();
      }
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

    if (notice.files.keys.length && notice.files.keys.length !== null) {
      let deleteNoticeKey = [];

      for (let i = 0; i < notice.files.keys.length; i++) {
        deleteNoticeKey.push({ Key: notice.files.keys[i] });
      }

      if (!notice) {
        return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
      }

      let params = {
        Bucket: 'memorialkang',
        Delete: {
          Objects: deleteNoticeKey
        }
      };

      s3.deleteObjects(params, function(err, data) {
        if (err) console.log('deleteObjects error: ', err, err.stack);
        else console.log('successful response: ', data);
      });
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
