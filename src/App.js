import './App.css';
import { Grid, Paper } from '@mui/material';
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { LeaderBoardTable } from './components/LeaderBoardTable';
import { InputPanel } from './components/InputPanel';

function ContestTitle({ contestDetails }) {
  return <Grid style={{ height: '10vh' }}>{contestDetails.title}</Grid>;
}

function App() {
  const [tableData, setTableData] = React.useState([]);
  const [contestDetails, setContestDetails] = React.useState({ title: '' });
  const [friendList, setFriendList] = React.useState({});
  getContest(contestDetails, setContestDetails);
  getLeaderBoard(friendList, tableData, setTableData);
  const paperStyle = { padding: 20, height: '100vh' };
  return (
    <Grid className='App'>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <ContestTitle contestDetails={contestDetails} />
          <InputPanel friendList={friendList} setFriendList={setFriendList} />
          <LeaderBoardTable tableData={tableData} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;

const getLeaderBoard = (friendList, tableData, setTableData) => {
  const data = JSON.stringify({
    friends: Object.entries(friendList).map(([id]) => id),
  });

  const config = {
    method: 'post',
    url: 'https://leetboard.herokuapp.com/friends',
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

const getContest = (contestDetails, setContestDetails) => {
  var config = {
    method: 'get',
    url: 'https://leetboard.herokuapp.com/contest',
  };

  axios(config)
    .then(function ({ data: response }) {
      if (!_.isEqual(response, contestDetails)) setContestDetails(response);
    })
    .catch(function (error) {
      console.log('ERROR : ', error);
    });
};
