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
import {UPDATE, LIKE, FETCH_ALL} from '../constants/action-types';

export const getServices = () => async dispatch => {
  try {
    const {data} = await api.fetchServices();

    dispatch({payload: data, type: FETCH_ALL, itemType: 'services'});
  } catch (error) {
    console.error(error.message);
  }
};

export const updateService = (id, service) => async dispatch => {
  try {
    const {data} = await api.updateService(id, service);

    dispatch({payload: data, type: UPDATE, itemType: 'services'});
  } catch (error) {
    console.error(error.message);
  }
};

export const likeService = id => async dispatch => {
  try {
    const {data} = await api.likeService(id);

    dispatch({payload: data, type: LIKE, itemType: 'services'});
  } catch (error) {
    console.error(error.message);
  }
};
