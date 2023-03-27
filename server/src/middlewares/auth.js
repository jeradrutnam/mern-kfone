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

import fetch from 'node-fetch';

const introspect = async asgardeoAccessToken => {
  const requestOptions = {
    credentials: 'include',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    method: 'POST',
  };

  const tokenExchangeResponse = await fetch(
    `${process.env.ASGARDEO_BASE_URL}/oauth2/introspect?token=${asgardeoAccessToken}`,
    requestOptions,
  );

  if (!tokenExchangeResponse.ok) {
    throw new Error('Failed introspecting token');
  }

  const responseBody = await tokenExchangeResponse.json();

  if (!responseBody?.active) {
    // Client should try refreshing the token
    return false;
  }

  return true;
};

const extractAccessToken = req => {
  if (!req?.headers?.authorization || !req.headers.authorization.split(' ')[1]) {
    return null;
  }

  const bearerToken = req.headers.authorization.split(' ');
  const asgardeoAccessToken = bearerToken.length > 1 ? bearerToken[1] : bearerToken[0];

  if (asgardeoAccessToken) {
    return asgardeoAccessToken;
  }
  return null;
};

export const isValidAccessToken = async (req, res) => {
  const validAccessToken = await introspect(extractAccessToken(req));

  if (validAccessToken) {
} else {
    res.status(401).send('Invalid Access Token');
  }
};
