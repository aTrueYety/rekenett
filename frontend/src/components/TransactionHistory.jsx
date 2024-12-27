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
      }}
    >
    <Typography>Kryss histore:</Typography>
    <Box sx={{
      width: 540, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
    }}>
    {loading 
      ? <CircularProgress /> 
      : '...'
    }
    </Box>
    </Card>
  );
};