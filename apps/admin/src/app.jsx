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

import React, {} from 'react';
import {CssBaseline} from '@mui/material';
import {useAuthContext} from '@asgardeo/auth-react';
import {StyleWrapper} from './style';
import DashboardLayout from './layouts/dashboard-layout';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import DashboardPage from './pages/dashboard-page';
import DevicesPage from './pages/devices-page';
import ServicesPage from './pages/services-page';
import PromotionsPage from './pages/promotions-page';
import AccessControlProvider from './providers/access-control-provider';

const App = () => {
  const {state} = useAuthContext();
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
