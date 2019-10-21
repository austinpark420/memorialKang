const aws = require('aws-sdk');
const config = require('config');

const accessKeyId = config.get('accessKeyId');
const secretAccessKey = config.get('secretAccessKey');

// PROFILE IMAGE STORING STARTS

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
  Bucket: 'memorialkang'
});

module.exports = s3;
