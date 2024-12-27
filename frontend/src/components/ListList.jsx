import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axiosInstance from '../axiosInstance';
import '../theme/Base.css';

export default function ListList({ loading, lists, setLists }) {
  const handleChange = async (index, event, value) => {
    const newLists = [...lists];
    newLists[index].is_user_in_list = value;
    setLists(newLists);

    try {
      // Update the relavant list-user relationship
      await axiosInstance.put(`/api/user-list-templates/${newLists[index].id}/update_user_in_list/`, {
        is_user_in_list: value,
      });
    } catch (error) {
      console.error('Failed to update lists', error);
    }
  };


  const renderRow = ({ index }) => {
    const list = lists[index];
    return (
      <ListItem key={index} component="div" disablePadding>
        <ListItemButton disableRipple sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography>{list.name}</Typography>
          <ToggleButtonGroup
            value={list.is_user_in_list}
            exclusive
            onChange={(event, value) => handleChange(index, event, value)}
            aria-label={list.name}
          >
            <ToggleButton value={true} aria-label="Vis meg">
              <VisibilityIcon />
            </ToggleButton>
            <ToggleButton value={false} aria-label="Ikke vis meg">
              <VisibilityOffIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Card
      sx={{
        mt: 3,
        textAlign: 'center',
        padding: 2,
        flexGrow: 1,
      }}
    >
      <Typography>Velg hvilke lister du vises på:</Typography>
      <Box
        sx={{
          width: '100%',
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
            itemCount={lists.length}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        }
      </Box>
    </Card>
  );
};