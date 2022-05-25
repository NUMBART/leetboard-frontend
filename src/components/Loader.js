import { Grid } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from './AppBar';
import { ContestPage } from './ContestPage';

export default function Loader() {
  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <ResponsiveAppBar />
      <ContestPage />;
    </Grid>
  );
}
