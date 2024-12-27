import React from 'react';
import { Card, CircularProgress, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import '../theme/Base.css';

export default function TransactionList({loading, transactions}) {


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
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[{
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },]}
        primaryCursor
        secondaryCursor
        tooltip
        height={400}
        />
    }
    </Box>
    </Card>
  );
};