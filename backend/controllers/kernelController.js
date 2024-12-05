// backend/controllers/kernelController.js

const systemCalls = require('../kernel/systemCalls');

// Create a new process
exports.createProcess = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Process name is required' });
  }
  const process = systemCalls.createProcess(name);
  res.status(201).json({ success: true, process });
};

// Terminate a process by PID
exports.terminateProcess = (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    return res.status(400).json({ success: false, message: 'Process ID (PID) is required' });
  }
  const result = systemCalls.terminateProcess(pid);
  if (result.success) {
    res.json({ success: true, pid: result.pid });
  } else {
    res.status(404).json({ success: false, message: result.message });
  }
};

// List all active processes
exports.listProcesses = (req, res) => {
  const processes = systemCalls.listProcesses();
  res.json({ success: true, processes });
};

// Get memory status
exports.getMemoryStatus = (req, res) => {
  const memoryStatus = systemCalls.getMemoryStatus();
  res.json({ success: true, memoryStatus });
};
