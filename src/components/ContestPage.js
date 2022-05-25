import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Grid, Paper, Typography } from '@mui/material';
import { LeaderBoardTable } from './LeaderBoardTable';
import { InputPanel } from './InputPanel';
import {
  getFriendListLeaderBoard,
  getGlobalLeaderBoard,
  getCountryLeaderBoard,
  getContest,
} from '../api/Contest';

export function ContestPage() {
  let storedFriendList = JSON.parse(localStorage.getItem('friendList'));
  const [tableData, setTableData] = React.useState([]);
  const [contestDetails, setContestDetails] = React.useState({ title: '' });
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
      getFriendListLeaderBoard(friendList, tableData, setTableData),
    global: () =>
      getGlobalLeaderBoard(
        globalPageNumber,
        setGlobalPageCount,
        tableData,
        setTableData
      ),
    country: () =>
      getCountryLeaderBoard(
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

  useEffect(() => {
    getContest(contestDetails, setContestDetails);
  }, []);

  return (
    <Grid className='App'>
      <Grid>
        <Paper elevation={10} style={{ padding: 20, minHeight: '100vh' }}>
          <ContestTitle contestDetails={contestDetails} />
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
          <LeaderBoardTable
            boardType={boardType}
            countryPageNumber={countryPageNumber}
            tableData={tableData}
            contestDetails={contestDetails}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
function ContestTitle({ contestDetails }) {
  return (
    <Grid sx={{ width: '100%', height: '10vh' }}>
      <Typography variant='h4' component='div' gutterBottom>
        Ranking for {contestDetails.title}
      </Typography>
    </Grid>
  );
}
