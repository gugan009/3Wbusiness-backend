const express = require('express');
const multer = require('multer');
const Submission = require('../models/Submission');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });


router.post('/', upload.array('images'), async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    const submission = new Submission({ name, socialMediaHandle, images: imagePaths });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
