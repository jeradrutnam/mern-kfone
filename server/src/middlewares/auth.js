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
import {JwtRsaVerifier} from 'aws-jwt-verify';
import {v4 as uuidv4} from 'uuid';

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
 * Validate the Asgardeo access token in the form of a JWT
 * @param {string} asgardeoAccessToken - The Asgardeo access token to introspect
 * @returns {boolean} Returns true if the access token is valid, false otherwise
 */
const validateJWT = async asgardeoAccessToken => {
  if (!asgardeoAccessToken) {
    return false;
  }

  const verifier = JwtRsaVerifier.create({
    audience: process.env.CLIENT_APP_ID.split(','),
    issuer: process.env.ISSUER_URL,
    jwksUri: process.env.JWKS_URL,
  });

  try {
    await verifier.verify(asgardeoAccessToken);
  } catch (err) {
    // The token is invalid
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
  const validateMethod = process.env.ACCESS_TOKEN_VALIDATION_METHOD || 'introspection';

  let isAccessTokenValid = false;
  if (validateMethod == 'jwtvalidation') {
    isAccessTokenValid = await validateJWT(asgardeoAccessToken);
  } else if (validateMethod == 'introspection') {
    isAccessTokenValid = await introspectAccessToken(asgardeoAccessToken);
  }

  if (isAccessTokenValid) {
    // The access token is valid, call the next middleware function
    next();
  } else {
    // The access token is invalid, return a 401 Unauthorized error
    res.status(401).json({
      code: 'MK-AUTH-00003',
      description: 'Unauthorized',
      message: 'Invalid Access Token',
      traceId: uuidv4(),
    });
  }
};
