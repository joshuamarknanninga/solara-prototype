// backend/kernel/systemCalls.js

const processManager = require('./processManager');
const memoryManager = require('./memoryManager');

class SystemCalls {
  // Process Management
  createProcess(name) {
    const process = processManager.createProcess(name);
    // Simulate memory allocation for the process (e.g., 256MB)
    memoryManager.allocateMemory(256);
    return process;
  }

  terminateProcess(pid) {
    const result = processManager.terminateProcess(pid);
    if (result.success) {
      // Simulate memory deallocation for the process (e.g., 256MB)
      memoryManager.freeMemory(256);
    }
    return result;
  }

  listProcesses() {
    return processManager.listProcesses();
  }

  // Memory Management
  getMemoryStatus() {
    return memoryManager.getMemoryStatus();
  }
}

module.exports = new SystemCalls();
