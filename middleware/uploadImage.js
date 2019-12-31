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
};
