import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const FileExplorer = ({ files }) => {
  return (
    <List>
      {files.map((file, index) => (
        <ListItem button key={index}>
          <ListItemText primary={file} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileExplorer;
