import React from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import '../theme/Base.css';

export default function TransactionHistory({ loading, transactions }) {
  console.log('transactions', transactions);
  const history_per_day = new Map();
  transactions.forEach(transaction => {
    const date = format(new Date(transaction.date), 'dd/mm/yy');
    if (history_per_day.has(date)) {
      history_per_day.set(date, history_per_day.get(date) + transaction.amount);
    } else {
      history_per_day.set(date, transaction.amount);
    }
  });
  console.log('history_per_day', history_per_day);

  return (
    <Card sx={{
      textAlign: 'center',
      padding: 2,
      width: '50%',
      flexGrow: 1,
    }}
    >
      <Typography>Kryss histore:</Typography>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {loading
          ? <CircularProgress />
          : <LineChart
            height={400}
            series={[
              { data: Array.from(history_per_day.values()), type: 'line' },
            ]}
            xAxis={[{ scaleType: 'point', data: Array.from(history_per_day.keys()) }]}
          />
        }
      </Box>
    </Card>
  );
};