const fs = require('fs');
const path = require('path');

// Example controller to get files from a specified directory
exports.getFiles = (req, res) => {
  // Adjust the directory path as needed
  const directoryPath = path.join(__dirname, '../../frontend/src/components'); // Example path

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Unable to scan directory');
    }
    res.json(files);
  });
};
