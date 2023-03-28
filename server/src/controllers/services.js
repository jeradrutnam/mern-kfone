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

import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import Service from '../models/service.js';

/**
 * Fetches all services from the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the list of services with a 200 status code on success or a 500 status code on failure
 */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({services});
  } catch (error) {
    res.status(500).json({
      code: 'MK-SERVICES-00001',
      description: error.message,
      message: 'An error occurred while retrieving the services.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Creates a new service in the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the newly created service with a 201 status code on success or a 409 status code on failure
 */
export const createService = async (req, res) => {
  // Extract the post data from the request body
  const post = req.body;

  // Create a new service with the post data
  const newService = new Service(post);

  try {
    // Save the new service to the database
    await newService.save();

    // Return the new service with a 201 status code
    res.status(201).json({service: newService});
  } catch (error) {
    // Return an error message with a 500 status code
    res.status(500).json({
      code: 'MK-SERVICES-00002',
      description: error.message,
      message: 'An error occurred while creating the service.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Updates an service with the given ID and data.
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const updateService = async (req, res) => {
  try {
    // Extract the service ID from the request params
    const {id: _id} = req.params;
    // Extract the service data from the request body
    const service = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      // If not, return a 404 error with a message
      return res.status(404).json({
        code: 'MK-SERVICES-00002',
        description: `Invalid ID: ${_id}`,
        message: 'Could not find any service with that ID.',
        traceId: uuidv4(),
      });
    }

    // Try to update the service with the given ID and data
    const updatedService = await Service.findByIdAndUpdate(_id, {...service, _id}, {new: true});

    // If no service was found with the given ID, return a 404 error with a message
    if (!updatedService) {
      return res.status(404).json({
        code: 'MK-SERVICES-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any service with that ID.',
        traceId: uuidv4(),
      });
    }

    // If the service was successfully updated, return the updated service with a 200 status code
    res.status(200).json(updatedService);
  } catch (error) {
    // If an error occurred during the update operation, log the error and return a 500 error with a message
    res.status(500).json({
      code: 'MK-SERVICES-00001',
      description: error.message,
      message: 'An error occurred while updating the service.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Deletes an service with the given ID.
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const deleteService = async (req, res) => {
  try {
    // Extract the service ID from the request params
    const {id: _id} = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      // If not, return a 400 Bad Request error with a message
      return res.status(400).json({
        code: 'MK-SERVICES-00002',
        description: 'Invalid ID format',
        message: 'The provided ID is not valid',
        traceId: uuidv4(),
      });
    }

    // Delete the service with the given ID from the database
    const result = await Service.deleteOne({_id});

    // Check if the service was found and deleted
    if (result.deletedCount === 0) {
      // If not, return a 404 Not Found error with a message
      return res.status(404).json({
        code: 'MK-SERVICES-00001',
        description: 'Service not found',
        message: 'The service with the provided ID was not found',
        traceId: uuidv4(),
      });
    }

    // If the service was successfully deleted, return a 204 No Content status
    res.sendStatus(204);
  } catch (err) {
    // If an error occurred, log the error and return a 500 Internal Server Error status
    res.status(500).json({
      code: 'MK-SERVICES-00003',
      description: 'Internal Server Error',
      message: 'An internal server error occurred',
      traceId: uuidv4(),
    });
  }
};
