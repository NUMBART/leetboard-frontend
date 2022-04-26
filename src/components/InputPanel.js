import {
  Box,
  Grid,
  TextField,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
} from '@mui/material';
import React from 'react';

export function InputPanel({
  friendList,
  setFriendList,
  boardType,
  setBoardType,
  globalPageNumber,
  setGlobalPageNumber,
  globalPageCount,
}) {
  const inputHandler = {
    friends: (
      <FriendInputPanel friendList={friendList} setFriendList={setFriendList} />
    ),
    global: (
      <GlobalInputPanel
        globalPageNumber={globalPageNumber}
        setGlobalPageNumber={setGlobalPageNumber}
        globalPageCount={globalPageCount}
      />
    ),
  };
  return (
    <Grid
      sx={{
        flexDirection: 'row',
        minHeight: '120px',
        width: '100%',
        display: 'flex',
      }}
    >
      <BoardTypeToggle boardType={boardType} setBoardType={setBoardType} />
      {inputHandler[boardType]}
    </Grid>
  );
}

function BoardTypeToggle({ boardType, setBoardType }) {
  return (
    <Grid sx={{ width: '20%' }}>
      <ToggleButtonGroup
        value={boardType}
        exclusive
        sx={{ height: '40px' }}
        onChange={(event, newType) => {
          setBoardType(newType);
        }}
        aria-label='text formatting'
      >
        <ToggleButton value='global' aria-label='bold'>
          Global
        </ToggleButton>
        <ToggleButton value='friends' aria-label='italic'>
          Friends
        </ToggleButton>
        {/* <ToggleButton value='country' aria-label='underlined'>
          Country
        </ToggleButton> */}
      </ToggleButtonGroup>
    </Grid>
  );
}

function GlobalInputPanel({
  globalPageNumber,
  setGlobalPageNumber,
  globalPageCount,
}) {
  return (
    <Grid
      sx={{
        width: '60%',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Pagination
        count={globalPageCount}
        page={globalPageNumber}
        onChange={(e, pageNumber) => setGlobalPageNumber(pageNumber)}
      />
    </Grid>
  );
}

function FriendInputPanel({ friendList, setFriendList }) {
  return (
    <Box
      style={{
        width: '60%',
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        variant='standard'
        placeholder='Add user to friend list'
        inputProps={{ className: 'textfield_label' }}
        onKeyUp={(e) => addFriend(e, friendList, setFriendList)}
      />
      <Grid style={{ width: '100%', padding: '20px' }}>
        {Object.entries(friendList).map(([id]) => {
          return (
            <Chip
              label={id}
              style={{ margin: '5px' }}
              onDelete={(e) => removeFriend(id, friendList, setFriendList)}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

function addFriend(event, friendList, setFriendList) {
  console.log(event);
  if (event.key === 'Enter') {
    let newFriendList = { ...friendList };
    newFriendList[event.target.value] = event.target.value;
    event.target.value = '';
    setFriendList(newFriendList);
  }
}

function removeFriend(friendName, friendList, setFriendList) {
  console.log(friendName);
  let newFriendList = { ...friendList };
  delete newFriendList[friendName];
  setFriendList(newFriendList);
}
