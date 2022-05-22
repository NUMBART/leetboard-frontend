import './App.css';
import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { LeaderBoardTable } from './components/LeaderBoardTable';
import { InputPanel } from './components/InputPanel';
import ReactGA from 'react-ga';
const TRACKING_ID = 'G-3ECBVRFPE2';
ReactGA.initialize(TRACKING_ID);

function ContestTitle({ contestDetails }) {
  return (
    <Grid
      sx={{ display: 'flex', justifyContent: 'space-around', height: '10vh' }}
    >
      <Grid sx={{ width: '10%' }}></Grid>
      <Grid sx={{ width: '80%' }}>
        <Typography variant='h4' component='div' gutterBottom>
          Ranking for {contestDetails.title}
        </Typography>
      </Grid>
      <Grid
        sx={{
          width: '10%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <iframe
          src='https://ghbtns.com/github-btn.html?user=NUMBART&repo=leetboard&type=star&size=large'
          frameborder='0'
          scrolling='0'
          width='170'
          height='30'
          title='GitHub'
        ></iframe>
      </Grid>
    </Grid>
  );
}

function App() {
  const [tableData, setTableData] = React.useState([]);
  const [contestDetails, setContestDetails] = React.useState({ title: '' });
  const [friendList, setFriendList] = React.useState({});
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

export default App;

const getFriendListLeaderBoard = (friendList, tableData, setTableData) => {
  const data = JSON.stringify({
    friends: Object.entries(friendList).map(([id]) => id),
  });

  const config = {
    method: 'post',
    url: 'https://leetboard-backend.herokuapp.com/friends',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function ({ data: response }) {
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getGlobalLeaderBoard = (
  globalPageNumber,
  setGlobalPageCount,
  tableData,
  setTableData
) => {
  const config = {
    method: 'get',
    url: 'https://leetboard-backend.herokuapp.com/global',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page: globalPageNumber,
    },
  };

  axios(config)
    .then(function ({ data }) {
      const { globalRankList: response, contestantCount } = data;
      const pageCount = Math.ceil(contestantCount / 50);
      setGlobalPageCount(pageCount);
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getCountryLeaderBoard = (
  country,
  countryPageNumber,
  setCountryPageCount,
  tableData,
  setTableData
) => {
  const config = {
    method: 'get',
    url: 'https://leetboard-backend.herokuapp.com/country',
    params: {
      page: countryPageNumber,
      country,
    },
  };
  axios(config)
    .then(({ data }) => {
      const { countryRankList: response, contestantCount } = data;
      const pageCount = Math.ceil(contestantCount / 50);
      setCountryPageCount(pageCount);
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getContest = (contestDetails, setContestDetails) => {
  var config = {
    method: 'get',
    url: 'https://leetboard-backend.herokuapp.com/contest',
  };

  axios(config)
    .then(function ({ data: response }) {
      if (!_.isEqual(response, contestDetails)) setContestDetails(response);
    })
    .catch(function (error) {
      console.log('ERROR : ', error);
    });
};
