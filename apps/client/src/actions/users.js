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

import * as api from '../api/user';
import { 
  USER_FETCH, 
  CREATE, 
  USER_FOLLOW, 
  USER_REMOVE_FOLLOW, 
  USER_ADD_CART, 
  USER_REMOVE_CART 
} from '../constants/action-types';

export const getUser = (id) => async dispatch => {
  try {
    const { data } = await api.fetchUserBySub(id);

    dispatch({ payload: data, type: USER_FETCH });
  } catch (error) {
    console.error(error.message);
  }
};

export const createUser = user => async dispatch => {
  try {
    const { data } = await api.createUser(user);

    dispatch({ payload: data, type: CREATE });
  } catch (error) {
    console.error(error.message);
  }
};

export const addFollowingItemToUser = (userId, itemId) => async dispatch => {
  try {
    const { data } = await api.addFollowingItemToUser(userId, itemId);
    dispatch({ payload: itemId, type: USER_FOLLOW });
  } catch (error) {
    console.error(error.message);
  }
};

export const removeFollowingItemFromUser = (userId, itemId) => async dispatch => {
  try {
    const { data } = await api.removeFollowingItemFromUser(userId, itemId);
    dispatch({ payload: itemId, type: USER_REMOVE_FOLLOW });
  } catch (error) {
    console.error(error.message);
  }
};

export const addCartItemToUser = (userId, itemId) => async dispatch => {
  try {
    const { data } = await api.addCartItemToUser(userId, itemId);
    dispatch({ payload: itemId, type: USER_ADD_CART });
  } catch (error) {
    console.error(error.message);
  }
};

export const removeCartItemFromUser = (userId, itemId) => async dispatch => {
  try {
    const { data } = await api.removeCartItemFromUser(userId, itemId);
    dispatch({ payload: itemId, type: USER_REMOVE_CART });
  } catch (error) {
    console.error(error.message);
  }
};
