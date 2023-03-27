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

import * as api from '../api';
import {CREATE, UPDATE, DELETE, LIKE, FETCH_ALL} from '../constants/action-types';

export const getPosts = () => async dispatch => {
  try {
    const {data} = await api.fetchPosts();

    dispatch({type: FETCH_ALL, payload: data});
  } catch (error) {
    console.error(error.message);
  }
};

export const createPost = post => async dispatch => {
  try {
    const {data} = await api.createPost(post);

    dispatch({type: CREATE, payload: data});
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const {data} = await api.updatePost(id, post);

    dispatch({type: UPDATE, payload: data});
  } catch (error) {
    console.error(error.message);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id});
  } catch (error) {
    console.error(error.message);
  }
};

export const likePost = id => async dispatch => {
  try {
    const {data} = await api.likePost(id);

    dispatch({type: LIKE, payload: data});
  } catch (error) {
    console.error(error.message);
  }
};
