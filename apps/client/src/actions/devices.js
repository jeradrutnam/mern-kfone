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

export const getDevices = () => async dispatch => {
  try {
    const {data} = await api.fetchDevices();

    dispatch({payload: data, type: FETCH_ALL, itemType: 'devices'});
  } catch (error) {
    console.error(error.message);
  }
};

export const updateDevice = (id, device) => async dispatch => {
  try {
    const {data} = await api.updateDevice(id, item);

    dispatch({payload: data, type: UPDATE, itemType: 'devices'});
  } catch (error) {
    console.error(error.message);
  }
};

export const likeDevice = id => async dispatch => {
  try {
    const {data} = await api.likeDevice(id);

    dispatch({payload: data, type: LIKE, itemType: 'devices'});
  } catch (error) {
    console.error(error.message);
  }
};
