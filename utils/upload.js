

import { S3Client } from '@aws-sdk/client-s3';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

let s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});


const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
});

export default upload;