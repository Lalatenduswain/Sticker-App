const express = require('express');
const multer = require('multer');
const User = require('../controllers/user');
const router = express.Router();
const upload = multer().single('profileImage');

router.get('/', User.index);

router.get('/:id',  User.show);

router.put('/:id', upload, User.updateDetails);

module.exports = router;