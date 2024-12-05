// frontend/src/components/MemoryManager.js

import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const MemoryManager = () => {
  const [memoryStatus, setMemoryStatus] = useState({
    totalMemory: 0,
    usedMemory: 0,
    availableMemory: 0,
  });

  // Fetch memory status on component mount and periodically
  useEffect(() => {
    fetchMemoryStatus();
    const interval = setInterval(fetchMemoryStatus, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMemoryStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/kernel/memory');
      if (response.data.success) {
        setMemoryStatus(response.data.memoryStatus);
      }
    } catch (error) {
      console.error('Error fetching memory status:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Memory Manager
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">Total Memory: {memoryStatus.totalMemory} MB</Typography>
          <Typography variant="body1">Used Memory: {memoryStatus.usedMemory} MB</Typography>
          <Typography variant="body1">Available Memory: {memoryStatus.availableMemory} MB</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MemoryManager;
