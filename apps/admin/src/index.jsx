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

import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from '@asgardeo/auth-react';
import App from './app';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider
    config={{
      signInRedirectURL: `${process.env.REACT_APP_CLIENT_BASE_URL}`,
      signOutRedirectURL: `${process.env.REACT_APP_CLIENT_BASE_URL}`,
      clientID: `${process.env.REACT_APP_CLIENT_ID}`,
      baseUrl: `${process.env.REACT_APP_ASGARDEO_BASE_URL}`,
      resourceServerURLs: [`${process.env.REACT_APP_API_ENDPOINT}`],
      scope: [
        'openid',
        'profile',
        'groups',
        'internal_login',
        'internal_user_count_view',
        'internal_user_mgt_create',
        'internal_user_mgt_delete',
        'internal_user_mgt_list',
        'internal_user_mgt_update',
        'internal_user_mgt_view',
      ],
    }}
  >
    <App />
  </AuthProvider>,
);
