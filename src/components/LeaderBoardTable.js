import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import moment from 'moment';
import React from 'react';

export function LeaderBoardTable({ tableData, contestDetails }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Finish Time</TableCell>
            <TableCell>Q1</TableCell>
            <TableCell>Q2</TableCell>
            <TableCell>Q3</TableCell>
            <TableCell>Q4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>
                {getDuration(row.finish_time, contestDetails.startTime)}
              </TableCell>
              {Object.entries(row.submissions).map(([id, submission]) => {
                let duration = getDuration(
                  submission.date,
                  contestDetails.startTime
                );
                return <TableCell key={id}>{duration}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const getDuration = (submissionUnixTime, contestStartUnixTime) => {
  let contestStartTime = moment.unix(contestStartUnixTime);
  let submissionTime = moment.unix(submissionUnixTime);
  let duration = moment
    .utc(submissionTime.diff(contestStartTime))
    .format('HH:mm:ss');
  return duration;
};
