import React from 'react';
import Page from '../components/Page';
import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';
import TransactionList from '../components/TransactionList';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

export default function Transactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (amount=30) => {
    console.log(amount);
    try {
      const response = await axiosInstance.get(`/api/transactions/?limit=${amount}`);
      const sortedTransactions = response.data.sort((b, a) => new Date(a.date) - new Date(b.date));
      setTransactions(sortedTransactions);
      console.log('Fetched transactions:', response.data);
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
        <Typography variant="h4">Adminstrer transaksjoner</Typography>
          <TransactionList 
            sx={{ mt: 3, width: '100%' }} 
            loading={loading} 
            transactions={transactions} 
            includeUser={true}
            refetch={fetchTransactions}  
          />
      </Box>
    </Page>
  );
};