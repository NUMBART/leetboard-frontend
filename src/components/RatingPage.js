import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Grid, Paper, Typography } from '@mui/material';
import { RatingLeaderBoardTable } from './RatingLeaderBoardTable';
import { InputPanel } from './InputPanel';
import {
  getFriendListRatingLeaderBoard,
  getGlobalRatingLeaderBoard,
  getCountryRatingLeaderBoard,
} from '../api/Contest';

export default function RatingPage() {
  let storedFriendList = JSON.parse(localStorage.getItem('friendList'));
  const [tableData, setTableData] = React.useState([]);
  const [friendList, setFriendList] = React.useState(
    storedFriendList ? storedFriendList : {}
  );
  const [boardType, setBoardType] = React.useState('global');
  const [globalPageNumber, setGlobalPageNumber] = React.useState(1);
  const [globalPageCount, setGlobalPageCount] = React.useState(1);
  const [countryPageNumber, setCountryPageNumber] = React.useState(1);
  const [countryPageCount, setCountryPageCount] = React.useState(1);
  const [country, setCountry] = React.useState('None');
  const getLeaderBoard = {
    friends: () =>
      getFriendListRatingLeaderBoard(friendList, tableData, setTableData),
    global: () =>
      getGlobalRatingLeaderBoard(
        globalPageNumber,
        setGlobalPageCount,
        tableData,
        setTableData
      ),
    country: () =>
      getCountryRatingLeaderBoard(
        country,
        countryPageNumber,
        setCountryPageCount,
        tableData,
        setTableData
      ),
  };

  useEffect(() => {
    ReactGA.initialize('UA-229616335-1');
    ReactGA.pageview('/');
  }, []);

  useEffect(() => {
    getLeaderBoard[boardType]();
  }, [boardType, globalPageNumber, countryPageNumber, country, friendList]);

  return (
    <Grid className='App'>
      <Grid>
        <Paper elevation={10} style={{ padding: 20, minHeight: '100vh' }}>
          <RatingTitle />
          <InputPanel
            friendList={friendList}
            setFriendList={setFriendList}
            boardType={boardType}
            setBoardType={setBoardType}
            globalPageNumber={globalPageNumber}
            setGlobalPageNumber={setGlobalPageNumber}
            globalPageCount={globalPageCount}
            country={country}
            setCountry={setCountry}
            countryPageNumber={countryPageNumber}
            setCountryPageNumber={setCountryPageNumber}
            countryPageCount={countryPageCount}
          />
          <RatingLeaderBoardTable
            boardType={boardType}
            countryPageNumber={countryPageNumber}
            tableData={tableData}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
function RatingTitle() {
  return (
    <Grid sx={{ width: '100%', height: '10vh' }}>
      <Typography variant='h4' component='div' gutterBottom>
        Ratings Leaderboard
      </Typography>
    </Grid>
  );
}
