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

export function RatingLeaderBoardTable({
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
            <TableCell key='Country'>Country</TableCell>
            <TableCell key='Rating'>Rating</TableCell>
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
              <TableCell key='rank'>{row.currentGlobalRanking}</TableCell>
              <TableCell key='username'>{row.username}</TableCell>
              <TableCell key='Country'>{row.countryName}</TableCell>
              <TableCell key='Rating'>
                {Math.round(row.currentRating)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
