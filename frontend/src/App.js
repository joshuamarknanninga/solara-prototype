// frontend/src/App.js

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import FileExplorer from './components/FileExplorer';
import NetworkManager from './components/NetworkManager';
import TaskManager from './components/TaskManager';
import ProcessManager from './components/ProcessManager';
import MemoryManager from './components/MemoryManager';
import axios from 'axios'; // Ensure axios is imported for fetching data
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();

    // Listen for real-time process updates (if applicable)
    socket.on('processCreated', (process) => {
      console.log('Process Created:', process);
      // Optionally, update state or perform actions
    });

    socket.on('processTerminated', ({ pid }) => {
      console.log('Process Terminated:', pid);
      // Optionally, update state or perform actions
    });

    return () => {
      socket.off('processCreated');
      socket.off('processTerminated');
    };
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        SolaraOS MVP
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <FileExplorer files={files} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NetworkManager />
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskManager />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProcessManager />
        </Grid>
        <Grid item xs={12} md={6}>
          <MemoryManager />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
