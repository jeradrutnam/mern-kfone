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

import {v4 as uuidv4} from 'uuid';
import User from '../models/user.js';

/**
 * Fetch user by Id from the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the user with a 200 status code on success or a 500 status code on failure
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({
      code: 'MK-USR-00001',
      description: error.message,
      message: 'An error occurred while retrieving the user.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Creates a new user in the database
 * @param {import('express').Request} req - The request object
 * @param {import('express').Response} res - The response object
 * @returns {object} Returns the newly created user with a 201 status code on success or a 409 status code on failure
 */
export const createUser = async (req, res) => {
  // Extract the post data from the request body
  const post = req.body;

  // Create a new user with the post data
  const newUser = new User(post);

  try {
    // Save the new user to the database
    await newUser.save();

    // Return the new user with a 201 status code
    res.status(201).json({user: newUser});
  } catch (error) {
    // Return an error message with a 500 status code
    res.status(500).json({
      code: 'MK-USR-00002',
      description: error.message,
      message: 'An error occurred while creating the user.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Add an item to the user's following list
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const addFollowingItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({
        code: 'MK-USR-00002',
        description: `Invalid ID: ${userId}`,
        message: 'Could not find any user with that ID.',
        traceId: uuidv4(),
      });
    }

    const favorited = user['favorited'];
    favorited.push(itemId);

    const updatedUser = await User.findByIdAndUpdate(userId, {...user, favorited }, {new: true});

    if (!updatedUser) {
      return res.status(404).json({
        code: 'MK-USR-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any user with that ID.',
        traceId: uuidv4(),
      });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(500).json({
      code: 'MK-USR-00001',
      description: error.message,
      message: 'An error occurred while updating the user.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Remove an item to the user's following list
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const removeFollowingItem = async (req, res) => {
  console.log("Start removeFollowingItem");
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;

    await User.updateOne({ _id: userId }, {
      $pullAll: {
          favorited: [ itemId ],
      },
    });

    const updatedUser = await User.findById(userId).exec();
    if (!updatedUser) {
      return res.status(404).json({
        code: 'MK-USR-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any user with that ID.',
        traceId: uuidv4(),
      });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      code: 'MK-USR-00001',
      description: error.message,
      message: 'An error occurred while updating the user.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Add an item to the user's cart
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const addCartItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;

    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({
        code: 'MK-USR-00002',
        description: `Invalid ID: ${userId}`,
        message: 'Could not find any user with that ID.',
        traceId: uuidv4(),
      });
    }

    const cart = user['cart'];
    cart.push(itemId);

    const updatedUser = await User.findByIdAndUpdate(userId, {...user, cart }, {new: true});

    if (!updatedUser) {
      return res.status(404).json({
        code: 'MK-USR-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any user with that ID.',
        traceId: uuidv4(),
      });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(500).json({
      code: 'MK-USR-00001',
      description: error.message,
      message: 'An error occurred while updating the user.',
      traceId: uuidv4(),
    });
  }
};

/**
 * Remove an item from the user's cart
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;

    await User.updateOne({ _id: userId }, {
      $pullAll: {
          cart: [ itemId ],
      },
    });

    const updatedUser = await User.findById(userId).exec();
    if (!updatedUser) {
      return res.status(404).json({
        code: 'MK-USR-00003',
        description: `ID not found: ${_id}`,
        message: 'Could not find any user with that ID.',
        traceId: uuidv4(),
      });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(500).json({
      code: 'MK-USR-00001',
      description: error.message,
      message: 'An error occurred while updating the user.',
      traceId: uuidv4(),
    });
  }
};