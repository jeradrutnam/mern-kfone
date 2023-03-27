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

/**
 * Introspects an Asgardeo access token to check if it is valid
 * @param {string} asgardeoAccessToken - The Asgardeo access token to introspect
 * @returns {boolean} Returns true if the access token is valid, false otherwise
 */
const introspectAccessToken = async asgardeoAccessToken => {
  const requestOptions = {
    credentials: 'include',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    method: 'POST',
  };

  const tokenIntrospectionResponse = await fetch(
    `${process.env.ASGARDEO_BASE_URL}/oauth2/introspect?token=${asgardeoAccessToken}`,
    requestOptions,
  );

  if (!tokenIntrospectionResponse.ok) {
    throw new Error('Failed to introspect access token');
  }

  const responseBody = await tokenIntrospectionResponse.json();

  if (!responseBody?.active) {
    // The token is invalid, client should try refreshing the token
    return false;
  }

  // The token is valid
  return true;
};

/**
 * Extracts an Asgardeo access token from the request headers
 * @param {object} req - The request object
 * @returns {string|null} Returns the Asgardeo access token or null if it cannot be extracted
 */
const extractAsgardeoAccessToken = req => {
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

/**
 * Middleware that checks if the Asgardeo access token is valid
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {void}
 */
export const isValidAccessToken = async (req, res, next) => {
  const asgardeoAccessToken = extractAsgardeoAccessToken(req);
  const isAccessTokenValid = await introspectAccessToken(asgardeoAccessToken);

  if (isAccessTokenValid) {
    // The access token is valid, call the next middleware function
    next();
  } else {
    // The access token is invalid, return a 401 Unauthorized error
    res.status(401).send('Invalid Access Token');
  }
};
