/**
 * MIT License
 *
 * Copyright (c) 2023 Jerad Rutnam (jeradrutnam.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, Button, AppBar, Typography, Grow, Grid, Toolbar, Icon} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useAuthContext} from '@asgardeo/auth-react';
import {getPosts} from './actions/posts';
import Posts from './components/posts/posts';
import Form from './components/form/form';
import IconMenu from './components/iconMenu/iconMenu';
import Devices from './components/devices/devices';
import FilterHeader from './components/filterHeader/filterHeader';
import {classes, StyleWrapper} from './style';
import {Box} from '@mui/system';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DevicesView from './components/devicesView/devicesView';
import ViewPromo from './components/viewPromo/viewPromo';
import Divider from '@mui/material/Divider';

const App = () => {
  const {state, signIn, signOut, on} = useAuthContext();
  const dispatch = useDispatch();

  const USER_AUTHENTICATED = 'userAuthenticated';

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem(USER_AUTHENTICATED) === 'true') {
      signIn();
    }
  }, []);

  on('sign-in', () => {
    localStorage.setItem(USER_AUTHENTICATED, 'true');
  });

  const handleLogout = () => {
    localStorage.setItem(USER_AUTHENTICATED, 'false');
    signOut();
  };

  return (
    <StyleWrapper>
      <CssBaseline />
      <AppBar position="relative" color="secondary" className={classes.appBar} style={{background: '#2E3B55'}}>
        <Toolbar sx={{flexWrap: 'wrap'}}>
          <Typography variant="h6" color="inherit" className={classes.heading} noWrap sx={{flexGrow: 1}}>
            Kfone - Manage Services
          </Typography>
          <Box style={{marginRight: 24}}>
            <Button variant="text">Dashboard</Button>
            <Button variant="text">Settings</Button>
            <Button variant="text">Manage Customers</Button>
          </Box>
          <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{display: {xs: 'none', md: 'flex'}}}>
          <IconMenu />
        </Grid>
        <Grid item xs={12} md={10}>
          <ViewPromo />
          {/* <DevicesView /> */}
        </Grid>
      </Grid>
    </StyleWrapper>
  );
};

export default App;
