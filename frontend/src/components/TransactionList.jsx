import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import { format } from 'date-fns';
import '../theme/Base.css';

export default function TransactionList({loading, transactions}) {
  const renderRow = ({ index }) => {
    const transaction = transactions[index];
    const formattedDate = format(new Date(transaction.date), 'dd/MM/yyyy');
    return (
      <ListItem key={index} component="div" disablePadding>
        <ListItemButton sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            color: transaction.amount > 0 ? 'var(--positive)' : 'inherit',
        }}>
          <Typography>{transaction.amount}</Typography>
          <Typography>{transaction.description}</Typography>
          <Typography>{formattedDate}</Typography>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Card
      sx={{ 
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography>Siste konto bevegelser:</Typography>
      <Box
      sx={{
        width: 360, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}>
        {loading 
          ? <CircularProgress />
          : <FixedSizeList
            height={400}
            itemSize={46}
            width='100%'
            itemCount={transactions.length}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        }
      </Box>
    </Card>
  );
};