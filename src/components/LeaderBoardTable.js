import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import React from 'react';

export function LeaderBoardTable({ tableData }) {
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
              <TableCell>{row.finish_time}</TableCell>
              {Object.entries(row.submissions).map(([id, submission]) => {
                return <TableCell key={id}>{submission.date}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
