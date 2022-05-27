import { Grid } from '@mui/material';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './AppBar';
import { ContestPage } from './ContestPage';
import RatingPage from './RatingPage';

export default function Loader() {
  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <ResponsiveAppBar />
      <Routes>
        <Route path='contest' element={<ContestPage />} />
        <Route path='rating' element={<RatingPage />} />
        <Route path='/' element={<Navigate replace to='contest' />} />
      </Routes>
    </Grid>
  );
}
