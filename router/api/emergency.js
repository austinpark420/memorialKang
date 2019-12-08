const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadFile = require('../../middleware/uploadFile');
const User = require('../../models/User');
const Emergency = require('../../models/Emergency');

// @route   GET api/emergencies
// @desc    Get emergency list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ date: -1 });
    res.json(emergencies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/emergencies/mainPosts
// @desc    Get emergency list
// @access  Public

router.get('/mainPosts', async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .sort({ date: -1 })
      .limit(10);
    res.json(emergencies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/emergencies/:id
// @desc    Get emergency by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    res.json(emergency);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Emergency not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Post api/emergencies
// @desc    Add emergency
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
      const emergencies = await Emergency.find();
      const emergencyNumber = emergencies.length ? emergencies.length + 1 : 1;

      const newEmergency = new Emergency({
        title: title,
        number: emergencyNumber,
        writer: user.name,
        content: content,
        files: {
          locations,
          keys,
          originalnames
        }
      });

      const emergency = await newEmergency.save();

      res.json(emergency);
    } catch (error) {
      console.log('**Emergency errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   Put api/emergencies
// @desc    Edit emergency
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

    let emergency = await Emergency.findById(req.body._id);
    if (!emergency) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (
          emergency.files.keys.length &&
          emergency.files.keys.length !== null
        ) {
          let deleteEmergencyKey = [];

          for (let i = 0; i < emergency.files.keys.length; i++) {
            deleteEmergencyKey.push({ Key: emergency.files.keys[i] });
          }

          let params = {
            Bucket: 'memorialkang',
            Delete: {
              Objects: deleteEmergencyKey
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

        emergency.title = title;
        emergency.content = content;
        emergency.files = {
          locations,
          keys,
          originalnames
        };

        emergency = await emergency.save();
      } else {
        const { title, content } = req.body;

        emergency.title = title;
        emergency.content = content;

        emergency = await emergency.save();
      }
      res.json(emergency);
    } catch (error) {
      console.log('**Emergency errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/emergencies/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (emergency.files.keys.length && emergency.files.keys.length !== null) {
      let deleteEmergencyKey = [];

      for (let i = 0; i < emergency.files.keys.length; i++) {
        deleteEmergencyKey.push({ Key: emergency.files.keys[i] });
      }

      if (!emergency) {
        return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
      }

      let params = {
        Bucket: 'memorialkang',
        Delete: {
          Objects: deleteEmergencyKey
        }
      };

      s3.deleteObjects(params, function(err, data) {
        if (err) console.log('deleteObjects error: ', err, err.stack);
        else console.log('successful response: ', data);
      });
    }

    await emergency.remove();

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
