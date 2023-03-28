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
import endpointConfig from '../configs/endpoint-config';

const request = requestConfig =>
  AsgardeoSPAClient.getInstance()
    .httpRequest(requestConfig)
    .then(response => response)
    .catch(error => error);

/**
 * Fetches the logged-in user's profile using the Asgardeo SCIM2 API.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The user profile object.
 * @throws {Error} If the API request fails.
 */
export async function fetchLoggedInUserProfile() {
  const endpoint = `${endpointConfig.api.endpoints.me}`;

  try {
    const response = await request({
      method: 'get',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
}
