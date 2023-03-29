/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Container,
  CssBaseline,
  Chip,
  Box,
  Button,
  AppBar,
  Typography,
  Grow,
  Grid,
  Toolbar,
  ThemeProvider,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '@asgardeo/auth-react';

import LOGO_IMAGE from './images/logo-full.svg';
import { getDevices } from './actions/devices';
import { getServices } from './actions/services';
import Items from './components/items/items';
import { classes, StyleWrapper, theme } from './style';
import { createUser, fetchUserBySub } from './api/users';
import {USER_FETCH} from './constants/action-types';

const App = () => {
  const { state, signIn, signOut, on, getDecodedIDToken } = useAuthContext();
  const [currentId, setCurrentId] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [tier, setTier] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const user = useSelector(state => state.users);

  const USER_AUTHENTICATED = 'userAuthenticated';
  const pages = ["Devices", "Services"]

  useEffect(() => {
    dispatch(getDevices());
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem(USER_AUTHENTICATED) === 'true') {
      signIn();
    }
  }, []);

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    setDisplayName(state.displayName);

    (async () => {
      const idToken = await getDecodedIDToken();
      if (idToken.username) {
        setDisplayName(idToken.username);
      }
      if (idToken.picture) {
        setPhotoUrl(idToken.picture);
      }

      let res = await fetchUserBySub(idToken.sub);
      if (!res.data?.user) {
        res = await createUser({ _id: idToken.sub });
      }
      dispatch({payload: res.data.user, type: USER_FETCH});
    })();
  }, [getDecodedIDToken, state?.isAuthenticated]);

  useEffect(() => {
    if (user) {
      setTier(calculateTier(user.points));
    } else {
      setTier(null);
    }
  }, [user]);

  on('sign-in', () => {
    localStorage.setItem(USER_AUTHENTICATED, 'true');
  });

  const handleLogout = () => {
    localStorage.setItem(USER_AUTHENTICATED, 'false');
    signOut();
  };

  const calculateTier = loyaltyPoints => {
    if (loyaltyPoints >= 500) {
      return { label: 'Platinum', color: 'platinum', message: 'You are a Platinum member' };
    } else if (loyaltyPoints >= 300) {
      return { label: 'Gold', color: 'gold', message: 'You are a Gold member' };
    } else if (loyaltyPoints >= 150) {
      return { label: 'Silver', color: 'platinum', message: 'You are a Silver member' };
    } else {
      return { label: 'Red', color: 'red', message: `${150 - loyaltyPoints} more needed for Silver` };
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, page, ...other } = props;
  
    return (
      <div
        id={`simple-tabpanel-${page}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <StyleWrapper>
        <CssBaseline />
        <AppBar position="relative" color="default" className={classes.appBar}>
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography variant="h6" color="inherit" className={classes.heading} noWrap sx={{ flexGrow: 1 }}>
              <img src={LOGO_IMAGE} alt="Kfone Logo" className={classes.logoImage} />
            </Typography>
            {!state.isAuthenticated ? (
              <>
                <Button
                  className={classes.buttonSubmit}
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  href={`${process.env.REACT_APP_ASGARDEO_SIGNUP_URL}`}
                >
                  Register
                </Button>
                <Button
                  className={classes.buttonSubmit}
                  variant="contained"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Box mx={2}>
                  {tier?.label.toLowerCase() === 'red' &&
                    <Typography variant="caption" display="inline-block" className={classes.chipCaption}>{tier?.message}</Typography>
                  }
                  <Chip icon={<StarIcon className='icon' />} className={`${classes.chip} ${tier?.color}`} label={tier?.label} />
                </Box>
                {photoUrl ? <Avatar alt="Photo" src={photoUrl} /> : <Avatar>{displayName?.charAt(0)}</Avatar>}
                <Box mx={2}>
                  <div>Hi {displayName}</div>
                </Box>
                <Button
                  className={classes.buttonSubmit}
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingLeft: '40px', paddingRight: '40px' }}>
            <Tabs value={value} onChange={handleChange}>
              {pages.map((page, index) => (
                <Tab label={page} key={index} />
              ))}
            </Tabs>
          </Box>
        </AppBar>
        <Container maxWidth="lg">
          <Grow in>
            <Grid
              className={classes.mainContainer}
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              {pages.map((page, index) => (
                  <TabPanel value={value} page={page} index={index} key={index}>
                    <Grid item xs={12} sm={12}>
                      <Items setCurrentId={setCurrentId} sm={4} tab={page} />
                    </Grid>
                  </TabPanel>
                ))}
            </Grid>
          </Grow>
        </Container>
      </StyleWrapper>
    </ThemeProvider>
  );
};

export default App;
