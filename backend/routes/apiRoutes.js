const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Example Route
router.get('/files', fileController.getFiles);

module.exports = router;
