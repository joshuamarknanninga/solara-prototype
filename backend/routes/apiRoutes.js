// backend/routes/apiRoutes.js

const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const networkController = require('../controllers/networkController');
const kernelController = require('../controllers/kernelController'); // New Controller

// File Routes
router.get('/files', fileController.getFiles);

// Network Routes (Assuming similar routes exist)
router.get('/networks', networkController.getNetworks);

// Kernel Routes
router.post('/kernel/process', kernelController.createProcess);
router.delete('/kernel/process/:pid', kernelController.terminateProcess);
router.get('/kernel/processes', kernelController.listProcesses);
router.get('/kernel/memory', kernelController.getMemoryStatus);

module.exports = router;
