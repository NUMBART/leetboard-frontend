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
    url: 'https://leetboardbe-subhrangshupandeyhit.b4a.run/daily-challenge',
  };

  axios(requestOptions)
    .then((result) => {
      console.log('daily challenge : ', result);
      setTimeout(() => {
        window.location.replace(result.data.link);
      }, 2000);
    })
    .catch((err) => {
      console.log('error while fetching daily challenge: ', err);
    });

  return (
    <Grid className='App'>
      <Grid sx={{ width: '100%', height: '10vh' }}>
        <Typography variant='h4' component='div' gutterBottom>
          The Person who goes to the gym regardless of how they feel will always
          beat the person who goes to the gym when they feel like going to the
          gym.
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
