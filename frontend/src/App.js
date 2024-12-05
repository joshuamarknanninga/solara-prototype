import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import FileExplorer from './components/FileExplorer';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/files')
      .then(response => response.json())
      .then(data => setFiles(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        MyOS MVP
      </Typography>
      <FileExplorer files={files} />
    </Container>
  );
}

export default App;
