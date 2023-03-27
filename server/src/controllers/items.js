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
import Item from '../models/item.js';

/**
 * Fetches all items from the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the list of items with a 200 status code on success or a 500 status code on failure
 */
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({items});
  } catch (error) {
    res.status(500).json({
      code: 'MK-ITEMS-00001',
      description: error.message,
      message: 'An error occurred while retrieving the items.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Creates a new item in the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the newly created item with a 201 status code on success or a 409 status code on failure
 */
export const createItem = async (req, res) => {
  // Extract the post data from the request body
  const post = req.body;

  // Create a new item with the post data
  const newItem = new Item(post);

  try {
    // Save the new item to the database
    await newItem.save();

    // Return the new item with a 201 status code
    res.status(201).json({item: newItem});
  } catch (error) {
    // Return an error message with a 500 status code
    res.status(500).json({
      code: 'MK-ITEMS-00002',
      description: error.message,
      message: 'An error occurred while creating the item.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Updates an item with the given ID and data.
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const updateItem = async (req, res) => {
  try {
    // Extract the item ID from the request params
    const {id: _id} = req.params;
    // Extract the item data from the request body
    const item = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      // If not, return a 404 error with a message
      return res.status(404).json({
        code: 'MK-ITEMS-00002',
        description: `Invalid ID: ${_id}`,
        message: 'Could not find any item with that ID.',
        traceId: uuidv4(),
      });
    }

    // Try to update the item with the given ID and data
    const updatedItem = await Item.findByIdAndUpdate(_id, {...item, _id}, {new: true});

    // If no item was found with the given ID, return a 404 error with a message
    if (!updatedItem) {
      return res.status(404).json({
        code: 'MK-ITEMS-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any item with that ID.',
        traceId: uuidv4(),
      });
    }

    // If the item was successfully updated, return the updated item with a 200 status code
    res.status(200).json(updatedItem);
  } catch (error) {
    // If an error occurred during the update operation, log the error and return a 500 error with a message
    res.status(500).json({
      code: 'MK-ITEMS-00001',
      description: error.message,
      message: 'An error occurred while updating the item.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Deletes an item with the given ID.
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const deleteItem = async (req, res) => {
  try {
    // Extract the item ID from the request params
    const {id: _id} = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      // If not, return a 400 Bad Request error with a message
      return res.status(400).json({
        code: 'MK-ITEMS-00002',
        description: 'Invalid ID format',
        message: 'The provided ID is not valid',
        traceId: uuidv4(),
      });
    }

    // Delete the item with the given ID from the database
    const result = await Item.deleteOne({_id});

    // Check if the item was found and deleted
    if (result.deletedCount === 0) {
      // If not, return a 404 Not Found error with a message
      return res.status(404).json({
        code: 'MK-ITEMS-00001',
        description: 'Item not found',
        message: 'The item with the provided ID was not found',
        traceId: uuidv4(),
      });
    }

    // If the item was successfully deleted, return a 204 No Content status
    res.sendStatus(204);
  } catch (err) {
    // If an error occurred, log the error and return a 500 Internal Server Error status
    res.status(500).json({
      code: 'MK-ITEMS-00003',
      description: 'Internal Server Error',
      message: 'An internal server error occurred',
      traceId: uuidv4(),
    });
  }
};
