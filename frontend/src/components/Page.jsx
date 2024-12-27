import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import styled from '@mui/material/styles/styled';
import { Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaidIcon from '@mui/icons-material/Paid';
import ShieldIcon from '@mui/icons-material/Shield';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const menuItems = [
  { text: 'Bruker', icon: <AccountCircleIcon />, href: '/user' },
  { text: 'Konto', icon: <AccountBalanceIcon />, href: '/account' },
  { text: 'Lister', icon: <FileCopyIcon />, href: '/lists' },
  { text: 'Sitater', icon: <FormatQuoteIcon />, href: '/quotes' },
  { text: 'Bar panel', icon: <LocalBarIcon />, href: '/bar_panel' },
];

const adminMenuItems = [
  { text: 'Betalinger', icon: <PaidIcon />, href: '/payments' },
  { text: 'Priser', icon: <RequestQuoteIcon />, href: '/prices' },
  { text: 'BSF', icon: <Typography fontWeight='bold'>BSF</Typography>, href: '/bsf' },
];

export default function Page({ children }) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log('Drawer opened');
  };

  const handleDrawerClose = () => {
    setOpen(false);
    console.log('Drawer closed');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Rekenett
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          ...(!open && {
            ...closedMixin,
            '& .MuiDrawer-paper': closedMixin,
          }),
          ...(open && {
            ...openedMixin,
            '& .MuiDrawer-paper': openedMixin,
          }),
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding onClick={() => { window.location.href = item.href }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{paddingTop: 2}}>
            <Typography sx={{color: 'gray', textAlign: 'center'}}>Admin</Typography>
          </Divider>
          <List>
            {adminMenuItems.map((item, index) => (
              <ListItem key={index} disablePadding onClick={() => { window.location.href = item.href }
              }>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Container>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
