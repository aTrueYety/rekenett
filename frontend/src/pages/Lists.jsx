import React from 'react';
import Page from '../components/Page';
import { Typography } from '@mui/material';
import ListList from '../components/ListList';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/api/user-list-templates/');
        setLists(response.data);
        console.log(response.data);
      } catch (error) {
        // setError('Failed to fetch transactions');
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Page>
      <Typography variant="h4" sx={{ mt: 3, textAlign: 'center'}}>Bar lister</Typography>
      <ListList loading={loading} lists={lists} setLists={setLists}/>
    </Page>
  );
};