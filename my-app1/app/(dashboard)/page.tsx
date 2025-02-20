"use client"; // Add this directive since we're using client-side functionality

import * as React from 'react';
import Typography from '@mui/material/Typography';
import JobsTable from './jobs/JobsTable';
import { Calendar } from './calendar/Calender';
import Loader from './Loader'; // Ensure this path is correct
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function HomePage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Hardcoded user data for testing
  const user = {
    name: 'Mohammad Taufique Imrose', // Replace with functionality to get user data after implementing authentication
  };

  // Simulate loading delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 500); 

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Display loader while loading
  if (isLoading) {
    return <Loader size={60} color="#3498db" />; // Customize size and color as needed
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Welcome, <strong>{user.name}</strong>!
      </Typography>
      <Grid container spacing={3} columns={2}>
        {/* Left Box - Calendar */}
        <Grid item xs={12} md={6}>
          <Box p={2} sx={{ border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
            <Calendar />
          </Box>
        </Grid>
  
        {/* Right Box - Jobs Table */}
        <Grid item xs={12} md={6}>
          <Box p={2} sx={{ border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
            <JobsTable />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}