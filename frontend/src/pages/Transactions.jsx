import React from 'react';
import Page from '../components/Page';
import Card from '@mui/material/Card';
import { Button, FormControl, Typography } from '@mui/material';
import TransactionList from '../components/TransactionList';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Select, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InputLabel from '@mui/material/InputLabel';
import '../theme/Base.css';

export default function Transactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (amount = 30) => {
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
      <Typography mt={3} variant="h4" textAlign='center'>Adminstrer transaksjoner</Typography>
      <Card sx={{ p: 2, mt: 3, width: '100%', textAlign: 'center' }}>
        <Typography textAlign='left' mb={1}>Registrer inskudd:</Typography>
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
        >
          <InputLabel id="select-label">Bruker *</InputLabel>
          <Select labelId="select-label" id="user" label="Bruker" required sx={{ width: 200, backgroundColor: 'var(--positive-slight)' }}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TextField id="description" label="Beskrivelse" variant="outlined" sx={{ flexGrow: 1, backgroundColor: 'var(--positive-slight)' }} />
          <TextField id="amount" label="Mengde" type='number' required sx={{ backgroundColor: 'var(--positive-slight)' }} />
          <Button type='submit' variant='contained'><FileUploadIcon /></Button>
        </FormControl>
        <Typography textAlign='left' mt={3} mb={1}>Registrer utgjift:</Typography>
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
        >
          <InputLabel id="select-label">Bruker *</InputLabel>
          <Select labelId="select-label" id="user" label="Bruker" required sx={{ width: 200, backgroundColor: 'var(--negative-slight)' }}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TextField id="description" label="Beskrivelse" variant="outlined" sx={{ flexGrow: 1, backgroundColor: 'var(--negative-slight)'  }} />
          <TextField id="amount" label="Mengde" type='number' required sx={{ backgroundColor: 'var(--negative-slight)' }} />
          <Button type='submit' variant='contained'><FileUploadIcon /></Button>
        </FormControl>
      </Card>
      <TransactionList
        sx={{ mt: 3, width: '100%' }}
        loading={loading}
        transactions={transactions}
        includeUser={true}
        refetch={fetchTransactions}
      />
    </Page>
  );
};