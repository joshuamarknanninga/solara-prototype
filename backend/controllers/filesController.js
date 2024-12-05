const fs = require('fs');
const path = require('path');

exports.getFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../../frontend/src/components'); // Example path
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    res.json(files);
  });
};
