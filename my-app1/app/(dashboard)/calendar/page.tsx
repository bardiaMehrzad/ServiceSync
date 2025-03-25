"use client";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Calendar } from './Calender';
import Loader from '../Loader';
import theme from '@/theme';

export default function OrdersPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Display loader while loading
  if (isLoading) {
    return <Loader size={60} color={theme.palette.primary.main} />; // Use theme primary color for loader
  }

  return (
    <><Typography>
    </Typography><Calendar /></>
  );
}
