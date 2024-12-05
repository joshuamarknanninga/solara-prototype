// frontend/src/components/NetworkManager.js

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const NetworkManager = () => {
  // Example static data
  const networks = ['Network1', 'Network2', 'Network3'];

  return (
    <List>
      {networks.map((network, index) => (
        <ListItem button key={index}>
          <ListItemText primary={network} />
        </ListItem>
      ))}
    </List>
  );
};

export default NetworkManager;
