const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');
const path = require('path');

module.exports = (req, res, next) => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: 'memorialkang',
      acl: 'public-read',
      key: function(req, file, cb) {
        cb(
          null,
          'images/' + Date.now() + '-' + path.basename(file.originalname)
        );
      }
    })
  }).array('images');

  upload(req, res, err => {
    if (err) {
      if (err.message === 'File too large') {
        var errors = '2MB 이하의 파일까지 업로드가 가능합니다.';
      }
      res.status(400).json({ errors: errors });
    } else {
      next();
    }
  });
};
