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

import React, {Fragment} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import useAccessControl from '../../hooks/use-access-control';
import {useNavigate} from 'react-router-dom';
import routesConfig from '../../configs/routes-config';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import LeakAddIcon from '@mui/icons-material/LeakAdd';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const SideNavigation = () => {
  const {access} = useAccessControl();
  const navigate = useNavigate();

  return (
    <Fragment>
      {access?.dashboard && (
        <ListItemButton onClick={() => navigate(routesConfig.dashboard)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      )}
      {access?.devices && (
        <ListItemButton onClick={() => navigate(routesConfig.devices)}>
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary="Devices" />
        </ListItemButton>
      )}
      {access?.services && (
        <ListItemButton onClick={() => navigate(routesConfig.services)}>
          <ListItemIcon>
            <LeakAddIcon />
          </ListItemIcon>
          <ListItemText primary="Services" />
        </ListItemButton>
      )}
      {access?.promotions && (
        <ListItemButton onClick={() => navigate(routesConfig.promotions)}>
          <ListItemIcon>
            <TrendingDownIcon />
          </ListItemIcon>
          <ListItemText primary="Promotions" />
        </ListItemButton>
      )}
    </Fragment>
  );
};

export default SideNavigation;
