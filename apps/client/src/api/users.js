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

import {AsgardeoSPAClient} from '@asgardeo/auth-react';

const url = `${process.env.REACT_APP_API_ENDPOINT}/users`;

const spaClient = AsgardeoSPAClient.getInstance();

const doHTTPRequest = requestConfig =>
  spaClient
    .httpRequest(requestConfig)
    .then(response => response)
    .catch(error => error);

export const fetchUserBySub = id => {
  const requestConfig = {
    method: 'GET',
    url: `${url}/${id}`,
  };

  return doHTTPRequest(requestConfig);
};

export const createUser = newUser => {
  const requestConfig = {
    data: newUser,
    method: 'POST',
    url,
  };

  return doHTTPRequest(requestConfig);
};

export const addFollowingItemToUser = (userId, itemId) => {
  const requestConfig = {
    method: 'PATCH',
    data: {itemId},
    url: `${url}/${userId}/follow`,
  };

  return doHTTPRequest(requestConfig);
};

export const removeFollowingItemFromUser = (userId, itemId) => {
  const requestConfig = {
    method: 'PATCH',
    data: {itemId},
    url: `${url}/${userId}/unfollow`,
  };

  return doHTTPRequest(requestConfig);
};

export const addCartItemToUser = (userId, itemId) => {
  const requestConfig = {
    method: 'PATCH',
    data: {itemId},
    url: `${url}/${userId}/addToCart`,
  };

  return doHTTPRequest(requestConfig);
};

export const removeCartItemFromUser = (userId, itemId) => {
  const requestConfig = {
    method: 'PATCH',
    data: {itemId},
    url: `${url}/${userId}/removeFromCart`,
  };

  return doHTTPRequest(requestConfig);
};
