const router = require('express').Router();
const { models: { User, VoteSong } } = require('../db');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username','email','admin', 'image'],
      include: [VoteSong ]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    // If there's an uploaded file, update the image path
    if (req.file) {
      req.body.image = req.file.location; // URL of the uploaded file in S3
    }

    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'admin', 'password', 'image']
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
