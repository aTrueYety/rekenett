import React, { useState } from 'react';
import { Box, Button, Card, CircularProgress, FormControl, TextField, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import { format } from 'date-fns';
import CachedIcon from '@mui/icons-material/Cached';
import '../theme/Base.css';

export default function TransactionList({ loading, transactions, includeUser = false, sx, refetch }) {
  const [filterText, setFilterText] = useState('');
  const [amountError, setAmountError] = useState(false);

  const validateAmount = (amount) => {
    if (!amount || amount <= 0) {
      setAmountError(true);
      return false;
    } else {
      setAmountError(false);
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('refetch');
    if (validateAmount(e.target.amount.value) && refetch !== undefined) refetch(e.target.amount.value);
  };

  const renderRow = ({ index }) => {
    const transaction = filtered_transactions[index];
    const formattedDate = format(new Date(transaction.date), 'dd/MM/yyyy');
    return (
      <ListItem key={index} component="div" disablePadding>
        <ListItemButton sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: transaction.amount < 0 ? 'var(--positive)' : 'inherit',
          gap: 2,
        }}>
          {includeUser && <Typography width='25%'>{transaction.username}</Typography>}
          <Typography width={includeUser ? '15%' : '23%'}>{transaction.amount}</Typography>
          <Typography width={includeUser ? '35%' : '43%'}>{transaction.description}</Typography>
          <Typography width={includeUser ? '25%' : '33%'}>{formattedDate}</Typography>
        </ListItemButton>
      </ListItem>
    );
  };

  const filtered_transactions = transactions.filter(transaction => {
    const string = transaction.username + transaction.amount + transaction.description + transaction.date;
    return string.toString().toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <Card
      sx={{
        textAlign: 'center',
        padding: 2,
        ...sx,
      }}
    >
      <Typography>Siste konto bevegelser:</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FormControl component='form' onSubmit={handleSubmit} sx={{ 
          mt: 2, 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'row', 
          gap: 1 
        }}>
          <TextField
            id="input-with-icon-adornment"
            label="Søk i transaksjoner"
            sx={{ flexGrow: 1 }}
            onChange={e => setFilterText(e.target.value)}
          />
          <TextField
            id="amount"
            label="Antall"
            type="number"
            sx={{ 
              flexGrow: 0.1, 
              maxWidth: 100,
              display: refetch === undefined ? 'none' : 'block',
            }}
            required
            error={amountError}
            onChange={e => validateAmount(e.target.value)}
          />
          <Button variant="contained" type='submit' sx={{ display: refetch === undefined ? 'none' : 'block' }}>
            <CachedIcon />
          </Button>
        </FormControl>
        {loading
          ? <CircularProgress />
          : <FixedSizeList
            height={300}
            itemSize={46}
            width='100%'
            itemCount={filtered_transactions.length}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        }
      </Box>
    </Card>
  );
};