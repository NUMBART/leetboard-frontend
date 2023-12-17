import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './AppBar';
import { ContestPage } from './ContestPage';
import RatingPage from './RatingPage';
function LeetcodeDailyRedirect() {
  const requestOptions = {
    method: 'get',
    url: 'https://x0fbzv2ig8.execute-api.ap-south-1.amazonaws.com/production/lc-daily',
  };

  axios(requestOptions)
    .then((result) => {
      console.log('daily challenge : ', result);
      setTimeout(() => {
        window.location.replace(result.data.mylink);
      }, 1500);
    })
    .catch((err) => {
      console.log('error while fetching daily challenge: ', err);
    });

  return (
    <Grid className='App'>
      <Grid sx={{ width: '100%', height: '10vh', paddingTop: '10%' }}>
        <Typography variant='h4' component='div' gutterBottom>
          Nobody cares what you did yesterday. What have you done today to
          better yourself?
        </Typography>
      </Grid>
    </Grid>
  );
}
export default function Loader() {
  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <ResponsiveAppBar />
      <Routes>
        <Route path='contest' element={<ContestPage />} />
        <Route path='rating' element={<RatingPage />} />
        <Route path='daily' element={<LeetcodeDailyRedirect />} />
        <Route path='/' element={<Navigate replace to='contest' />} />
      </Routes>
    </Grid>
  );
}
