import { Box, Grid, TextField, Chip } from '@mui/material';
import React from 'react';

export function InputPanel({ friendList, setFriendList }) {
  return (
    <Box
      style={{
        width: '100%',
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
