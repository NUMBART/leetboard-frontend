import { Grid, Paper, Typography } from '@mui/material';

export default function RatingPage() {
  return (
    <Grid>
      <Paper elevation={10} style={{ padding: 20, minHeight: '100vh' }}>
        <Typography>
          Create custom friend leaderboards for{' '}
          <a href='https://leetcode.com/contest/globalranking/'>
            global rankings
          </a>{' '}
          as well along with country wise rankings. Coming soon!
        </Typography>
      </Paper>
    </Grid>
  );
}
