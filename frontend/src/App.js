// src/App.js
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import FileExplorer from './components/FileExplorer';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch files from backend API
    fetch('http://localhost:3001/api/files')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setFiles(data);
      })
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  useEffect(() => {
    // Handle Socket.io connection events
    socket.on('connect', () => {
      console.log('Connected to backend via Socket.io');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend');
    });

    // Cleanup on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        SolaraOS MVP
      </Typography>
      <FileExplorer files={files} />
    </Container>
  );
}

export default App;
