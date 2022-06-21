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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export function LeaderBoardTable({
  tableData,
  contestDetails,
  boardType,
  countryPageNumber,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {boardType === 'country' ? (
              <TableCell key='Country Rank'>Country Rank</TableCell>
            ) : null}
            <TableCell key='Rank'>Rank</TableCell>
            <TableCell key='Name'>Name</TableCell>
            <TableCell key='Score'>Score</TableCell>
            <TableCell key='Finish Time'>Finish Time</TableCell>
            <TableCell key='Q1'>Q1</TableCell>
            <TableCell key='Q2'>Q2</TableCell>
            <TableCell key='Q3'>Q3</TableCell>
            <TableCell key='Q4'>Q4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {boardType === 'country' ? (
                <TableCell key='country_rank'>
                  {50 * (countryPageNumber - 1) + index + 1}
                </TableCell>
              ) : null}
              <TableCell key='rank'>{row.rank}</TableCell>
              <TableCell key='username'>{row.username}</TableCell>
              <TableCell key='score'>{row.score}</TableCell>
              <TableCell key='finish_time'>
                {getDuration(row.finish_time, contestDetails.startTime)}
              </TableCell>
              {Object.entries(row.submissions).map(([id, submission]) => {
                let duration = getDuration(
                  submission.date,
                  contestDetails.startTime
                );
                let subTime = submission.fail_count ? (
                  <div>
                    {duration} <FontAwesomeIcon icon={faBug} color='crimson' />{' '}
                    {submission.fail_count}
                  </div>
                ) : (
                  duration
                );
                return <TableCell key={id}>{subTime}</TableCell>;
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
