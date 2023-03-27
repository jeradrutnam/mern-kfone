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
import {isValidAccessToken} from '../middlewares/auth.js';
import PostMessage from '../models/postMessage.js';

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
