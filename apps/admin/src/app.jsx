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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DashboardLayout from './layouts/dashboard-layout';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import DashboardPage from './pages/dashboard-page';
import DevicesPage from './pages/devices-page';
import ServicesPage from './pages/services-page';
import PromotionsPage from './pages/promotions-page';
import PageSpinner from './components/spinners/page-spinner';
import AccessControlProvider from './providers/access-control-provider';

const App = () => {
  const {state, signIn, signOut, on} = useAuthContext();
  const {isAuthenticated, isLoading} = state;

  // if (isLoading) {
  //   return <PageSpinner />;
  // }

  return (
    <AccessControlProvider>
      <StyleWrapper>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="devices" element={<DevicesPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="promotions" element={<PromotionsPage />} />
            </Route>
          </Routes>
        </Router>
      </StyleWrapper>
    </AccessControlProvider>
  );
};

export default App;
