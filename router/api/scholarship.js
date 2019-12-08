const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadFile = require('../../middleware/uploadFile');
const User = require('../../models/User');
const Scholarship = require('../../models/Scholarship');

// @route   GET api/scholarships
// @desc    Get scholarship list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ date: -1 });
    res.json(scholarships);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/scholarships/:id
// @desc    Get scholarship by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    res.json(scholarship);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Scholarship not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Post api/scholarships
// @desc    Add scholarship
// @access  Private

router.post(
  '/',
  [
    uploadFile,
    auth,
    [
      check('title', '제목을 입력해 주세요')
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

      const { title, content } = req.body;

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
      const scholarships = await Scholarship.find();
      const scholarshipNumber = scholarships.length
        ? scholarships.length + 1
        : 1;

      const newScholarship = new Scholarship({
        title: title,
        number: scholarshipNumber,
        writer: user.name,
        content: content,
        files: {
          locations,
          keys,
          originalnames
        }
      });

      const scholarship = await newScholarship.save();

      res.json(scholarship);
    } catch (error) {
      console.log('**Scholarship errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   Put api/scholarships
// @desc    Edit scholarship
// @access  Private

router.put(
  '/',
  [
    uploadFile,
    auth,
    [
      check('title', '제목을 입력해 주세요')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let scholarship = await Scholarship.findById(req.body._id);
    if (!scholarship) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (
          scholarship.files.keys.length &&
          scholarship.files.keys.length !== null
        ) {
          let deleteScholarshipKey = [];

          for (let i = 0; i < scholarship.files.keys.length; i++) {
            deleteScholarshipKey.push({ Key: scholarship.files.keys[i] });
          }

          let params = {
            Bucket: 'memorialkang',
            Delete: {
              Objects: deleteScholarshipKey
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

        const { title, content } = req.body;

        scholarship.title = title;
        scholarship.content = content;
        scholarship.files = {
          locations,
          keys,
          originalnames
        };

        scholarship = await scholarship.save();
      } else {
        const { title, content } = req.body;

        scholarship.title = title;
        scholarship.content = content;

        scholarship = await scholarship.save();
      }
      res.json(scholarship);
    } catch (error) {
      console.log('**Scholarship errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/scholarships/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (
      scholarship.files.keys.length &&
      scholarship.files.keys.length !== null
    ) {
      let deleteScholarshipKey = [];

      for (let i = 0; i < scholarship.files.keys.length; i++) {
        deleteScholarshipKey.push({ Key: scholarship.files.keys[i] });
      }

      if (!scholarship) {
        return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
      }

      let params = {
        Bucket: 'memorialkang',
        Delete: {
          Objects: deleteScholarshipKey
        }
      };

      s3.deleteObjects(params, function(err, data) {
        if (err) console.log('deleteObjects error: ', err, err.stack);
        else console.log('successful response: ', data);
      });
    }

    await scholarship.remove();

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
