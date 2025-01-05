import React from 'react';
import Page from '../components/Page';
import { Box } from '@mui/material';
import TransactionsList from '../components/TransactionList';
import TransactionHistory from '../components/TransactionHistory';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (amount=30) => {
    console.log('a'+amount);
    try {
      const response = await axiosInstance.get('/api/user-transactions/');
      const sortedTransactions = response.data.sort((b, a) => new Date(a.date) - new Date(b.date));
      setTransactions(sortedTransactions);
    } catch (error) {
      // setError('Failed to fetch transactions');
      console.error('Failed to fetch transactions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Page>
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">
          Du har {
            loading
              ? '...'
              : transactions.reduce((sum, transaction) => sum - transaction.amount, 0)
          } kryss
        </Typography>
        <Typography variant="h6">
          Totalt har du krysset for {
            loading
              ? '...'
              : transactions
                .filter(transaction => transaction.amount > 0)
                .reduce((sum, transaction) => sum + transaction.amount, 0)
          } kryss
        </Typography>
        <Box sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'row', gap: 3, flexWrap: 'wrap' }}>
          <TransactionsList sx={{flexGrow: 1}} loading={loading} transactions={transactions} />
          <TransactionHistory loading={loading} transactions={transactions} />
        </Box>
        <Card
          sx={{ mt: 3, p: 2, width: '100%', textAlign: 'center' }}
        >
          hei
        </Card>
      </Box>
    </Page>
  );
};