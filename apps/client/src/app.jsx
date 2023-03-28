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

import React, {useEffect, useState} from 'react';
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
} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useAuthContext} from '@asgardeo/auth-react';

import LOGO_IMAGE from './images/logo-full.svg';
import {getItems} from './actions/items';
import Posts from './components/items/items';
import Form from './components/form/form';
import {classes, StyleWrapper, theme} from './style';
import {createUser, fetchUserBySub} from './api/user';

const App = () => {
  const {state, signIn, signOut, on, getDecodedIDToken} = useAuthContext();
  const [currentId, setCurrentId] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(null);
  const [tier, setTier] = useState(null);
  const dispatch = useDispatch();

  const USER_AUTHENTICATED = 'userAuthenticated';

  useEffect(() => {
    dispatch(getItems());
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
        res = await createUser({_id: idToken.sub});
      }
      setLoyaltyPoints(res.data.user.points);
    })();
  }, [getDecodedIDToken, state?.isAuthenticated]);

  useEffect(() => {
    setTier(calculateTier(loyaltyPoints));
  }, [loyaltyPoints]);

  on('sign-in', () => {
    localStorage.setItem(USER_AUTHENTICATED, 'true');
  });

  const handleLogout = () => {
    localStorage.setItem(USER_AUTHENTICATED, 'false');
    signOut();
  };

  const calculateTier = loyaltyPoints => {
    if (loyaltyPoints >= 500) {
      return 'Platinum';
    } else if (loyaltyPoints >= 300) {
      return 'Gold';
    } else if (loyaltyPoints >= 150) {
      return 'Silver';
    } else {
      return `${150 - loyaltyPoints} more needed for Silver`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyleWrapper>
        <CssBaseline />
        <AppBar position="relative" color="default" className={classes.appBar}>
          <Toolbar sx={{flexWrap: 'wrap'}}>
            <Typography variant="h6" color="inherit" className={classes.heading} noWrap sx={{flexGrow: 1}}>
              <img src={LOGO_IMAGE} alt="Kfone Logo" />
            </Typography>
            {!state.isAuthenticated ? (
              <>
                <Button
                  className={classes.buttonSubmit}
                  variant="outlined"
                  sx={{my: 1, mx: 1.5}}
                  href={`${process.env.REACT_APP_ASGARDEO_SIGNUP_URL}`}
                >
                  Register
                </Button>
                <Button
                  className={classes.buttonSubmit}
                  variant="contained"
                  sx={{my: 1, mx: 1.5}}
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Box mx={2}>
                  <Chip label={tier} />
                </Box>
                {photoUrl ? <Avatar alt="Photo" src={photoUrl} /> : <Avatar>{displayName?.charAt(0)}</Avatar>}
                <Box mx={2}>
                  <div>Hi {displayName}</div>
                </Box>
                <Button
                  className={classes.buttonSubmit}
                  variant="outlined"
                  sx={{my: 1, mx: 1.5}}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
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
              {state.isAuthenticated ? (
                <>
                  <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} sm={6} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={12}>
                    <Posts setCurrentId={setCurrentId} sm={4} />
                  </Grid>
                </>
              )}
            </Grid>
          </Grow>
        </Container>
      </StyleWrapper>
    </ThemeProvider>
  );
};

export default App;
