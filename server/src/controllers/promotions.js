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
import Promotion from '../models/Promotion.js';

/**
 * Fetches all promotions from the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the list of promotions with a 200 status code on success or a 500 status code on failure
 */
export const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();

    res.status(200).json({promotions});
  } catch (error) {
    res.status(500).json({
      code: 'MK-PROMOTIONS-00001',
      description: error.message,
      message: 'An error occurred while retrieving the promotions.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Creates a new promotion in the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the newly created promotion with a 201 status code on success or a 500 status code on failure
 */
export const createPromotion = async (req, res) => {
  // Extract the post data from the request body
  const post = req.body;

  // Create a new promotion with the post data
  const newPromotion = new Promotion(post);

  try {
    // Save the new promotion to the database
    await newPromotion.save();

    // Return the new promotion with a 201 status code
    return res.status(201).json({promotion: newPromotion});
  } catch (error) {
    // Return an error message with a 500 status code
    return res.status(500).json({
      code: 'MK-PROMOTIONS-00002',
      description: error.message,
      message: 'An error occurred while creating the promotion.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Updates a promotion with the given ID and data.
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const updatePromotion = async (req, res) => {
  try {
    // Extract the promotion ID from the request params
    const {id: _id} = req.params;
    // Extract the promotion data from the request body
    const promotion = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      // If not, return a 404 error with a message
      return res.status(404).json({
        code: 'MK-PROMOTIONS-00002',
        description: `Invalid ID: ${_id}`,
        message: 'Could not find any promotion with that ID.',
        traceId: uuidv4(),
      });
    }

    // Try to update the promotion with the given ID and data
    const updatedPromotion = await Promotion.findByIdAndUpdate(_id, {...promotion, _id}, {new: true});

    // If no promotion was found with the given ID, return a 404 error with a message
    if (!updatedPromotion) {
      return res.status(404).json({
        code: 'MK-PROMOTIONS-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any promotion with that ID.',
        traceId: uuidv4(),
      });
    }

    // If the promotion was successfully updated, return the updated promotion with a 200 status code
    return res.status(200).json(updatedPromotion);
  } catch (error) {
    // If an error occurred during the update operation, log the error and return a 500 error with a message
    return res.status(500).json({
      code: 'MK-PROMOTIONS-00001',
      description: error.message,
      message: 'An error occurred while updating the promotion.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Deletes a promotion with the given ID.
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const deletePromotion = async (req, res) => {
  try {
    // Extract the promotion ID from the request params
    const {id: _id} = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      // If not, return a 400 Bad Request error with a message
      return res.status(400).json({
        code: 'MK-PROMOTIONS-00002',
        description: 'Invalid ID format',
        message: 'The provided ID is not valid',
        traceId: uuidv4(),
      });
    }

    // Delete the promotion with the given ID from the database
    const result = await Promotion.deleteOne({_id});

    // Check if the promotion was found and deleted
    if (result.deletedCount === 0) {
      // If not, return a 404 Not Found error with a message
      return res.status(404).json({
        code: 'MK-PROMOTIONS-00001',
        description: 'Promotion not found',
        message: 'The promotion with the provided ID was not found',
        traceId: uuidv4(),
      });
    }

    // If the promotion was successfully deleted, return a 204 No Content status
    res.sendStatus(204);
  } catch (err) {
    // If an error occurred, log the error and return a 500 Internal Server Error status
    res.status(500).json({
      code: 'MK-PROMOTIONS-00003',
      description: 'Internal Server Error',
      message: 'An internal server error occurred',
      traceId: uuidv4(),
    });
  }
};
