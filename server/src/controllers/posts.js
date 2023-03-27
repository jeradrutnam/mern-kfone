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
import fetch from 'node-fetch';

import PostMessage from '../models/postMessage.js';

const introspect = async asgardeoAccessToken => {
  const requestOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
      Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
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

const isValidAccessToken = async (req, res) => {
  const validAccessToken = await introspect(extractAccessToken(req));

  if (validAccessToken) {
  } else {
    res.status(401).send('Invalid Access Token');
  }
};

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

export const createPost = async (req, res) => {
  await isValidAccessToken(req, res);

  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};

export const updatePost = async (req, res) => {
  await isValidAccessToken(req, res);

  const {id: _id} = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');

  const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

  res.status(201).json(updatePost);
};

export const deletePost = async (req, res) => {
  await isValidAccessToken(req, res);

  const {id: _id} = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');

  await PostMessage.findByIdAndRemove(_id);

  res.status(201).json({message: 'Post deleted successfully.'});
};

export const likePost = async (req, res) => {
  await isValidAccessToken(req, res);

  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');

  const post = await PostMessage.findById(_id);
  const updatePost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true});

  res.status(201).json(updatePost);
};
