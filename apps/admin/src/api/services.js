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
 * Fetches the list of services using the REST API.
 *
 * @async
 * @function
 * @returns {Promise<Object>} Services response.
 * @throws {Error} If the API request fails.
 */
export async function fetchServices() {
  const endpoint = `${endpointConfig.api.endpoints.services}`;

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
    throw new Error('Failed to fetch the services');
  }
}

/**
 * Creates a new service using the REST API.
 *
 * @async
 * @function
 * @param {Object} body - The service object to create.
 * @returns {Promise<Object>} The newly created service object.
 * @throws {Error} If the API request fails.
 */
export async function createService(body) {
  const endpoint = `${endpointConfig.api.endpoints.services}`;

  try {
    const response = await request({
      method: 'post',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to create the service');
  }
}

/**
 * Updates an existing service using the REST API.
 *
 * @async
 * @function
 * @param {string} serviceId - The ID of the service to update.
 * @param {Object} body - The updates to apply to the service.
 * @returns {Promise<Object>} The updated service object.
 * @throws {Error} If the API request fails.
 */
export async function updateService(id, body) {
  const endpoint = `${endpointConfig.api.endpoints.services}/${id}`;

  try {
    const response = await request({
      method: 'put',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to update the service');
  }
}

/**
 * Deletes an existing service using the REST API.
 *
 * @async
 * @function
 * @param {string} id - The ID of the service to delete.
 * @returns {Promise<void>} A promise that resolves when the service has been deleted.
 * @throws {Error} If the API request fails.
 */
export async function deleteService(id) {
  const endpoint = `${endpointConfig.api.endpoints.services}/${id}`;

  try {
    await request({
      method: 'delete',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed to delete the service');
  }
}
