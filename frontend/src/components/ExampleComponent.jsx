import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import api from '../services/api';

const ExampleComponent = () => {
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    api.get('examples/')
      .then(response => setExamples(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Examples
      </Typography>
      <List>
        {examples.map(example => (
          <ListItem key={example.id}>
            <ListItemText
              primary={example.name}
              secondary={example.description}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExampleComponent;
