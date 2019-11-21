const express = require('express');
const router = express.Router();
const s3 = require('../../config/s3');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const uploadFile = require('../../middleware/uploadFile');
const User = require('../../models/User');
const Document = require('../../models/Document');

// @route   GET api/documents
// @desc    Get document list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().sort({ date: -1 });
    res.json(documents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   GET api/documents/:id
// @desc    Get document by ID
// @access  Pubulic

router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    res.json(document);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Post api/documents
// @desc    Add document
// @access  Private

router.post(
  '/',
  [
    uploadFile.array('files'),
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

      const { title, category, content } = req.body;

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
      const documents = await Document.find();
      const documentNumber = documents.length ? documents.length + 1 : 1;

      const newDocument = new Document({
        title: title,
        number: documentNumber,
        writer: user.name,
        category: category,
        content: content,
        files: {
          locations,
          keys,
          originalnames
        }
      });

      const document = await newDocument.save();

      res.json(document);
    } catch (error) {
      console.log('**Document errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route   Put api/documents
// @desc    Edit document
// @access  Private

router.put(
  '/',
  [
    uploadFile.array('files'),
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

    let document = await Document.findById(req.body._id);
    if (!document) {
      return res.status(404).json({ msg: '게시물이 존재하지 않습니다' });
    }

    try {
      let fileArray = req.files;

      if (fileArray.length && fileArray !== null) {
        if (document.files.keys.length && document.files.keys.length !== null) {
          let deleteDocumentKey = [];

          for (let i = 0; i < document.files.keys.length; i++) {
            deleteDocumentKey.push({ Key: document.files.keys[i] });
          }

          let params = {
            Bucket: 'memorialkang',
            Delete: {
              Objects: deleteDocumentKey
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

        document.title = title;
        document.category = category;
        document.content = content;
        document.files = {
          locations,
          keys,
          originalnames
        };

        document = await document.save();
      } else {
        const { title, category, content } = req.body;

        document.title = title;
        document.category = category;
        document.content = content;

        document = await document.save();
      }
      res.json(document);
    } catch (error) {
      console.log('**Document errors**', error.message);
      res.status(500).send('서버 에러');
    }
  }
);

// @route    DELETE api/documents/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (document.files.keys.length && document.files.keys.length !== null) {
      let deleteDocumentKey = [];

      for (let i = 0; i < document.files.keys.length; i++) {
        deleteDocumentKey.push({ Key: document.files.keys[i] });
      }

      if (!document) {
        return res.status(404).json({ msg: '게시물이 존재하지 않습니다.' });
      }

      let params = {
        Bucket: 'memorialkang',
        Delete: {
          Objects: deleteDocumentKey
        }
      };

      s3.deleteObjects(params, function(err, data) {
        if (err) console.log('deleteObjects error: ', err, err.stack);
        else console.log('successful response: ', data);
      });
    }

    await document.remove();

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
