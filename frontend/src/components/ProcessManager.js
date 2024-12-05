// frontend/src/components/ProcessManager.js

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ProcessManager = () => {
  const [processes, setProcesses] = useState([]);
  const [processName, setProcessName] = useState('');

  // Fetch processes on component mount
  useEffect(() => {
    fetchProcesses();
  }, []);

  const fetchProcesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/kernel/processes');
      if (response.data.success) {
        setProcesses(response.data.processes);
      }
    } catch (error) {
      console.error('Error fetching processes:', error);
    }
  };

  const handleCreateProcess = async () => {
    if (!processName.trim()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/kernel/process', { name: processName });
      if (response.data.success) {
        setProcessName('');
        fetchProcesses();
      }
    } catch (error) {
      console.error('Error creating process:', error);
    }
  };

  const handleTerminateProcess = async (pid) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/kernel/process/${pid}`);
      if (response.data.success) {
        fetchProcesses();
      }
    } catch (error) {
      console.error('Error terminating process:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Process Manager
      </Typography>
      <TextField
        label="Process Name"
        value={processName}
        onChange={(e) => setProcessName(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="primary" onClick={handleCreateProcess} style={{ marginLeft: '10px' }}>
        Create Process
      </Button>
      <List>
        {processes.map((process) => (
          <ListItem key={process.pid} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleTerminateProcess(process.pid)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${process.name} (PID: ${process.pid})`} secondary={`Status: ${process.status}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProcessManager;
