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

import {CREATE, UPDATE, DELETE, LIKE, FETCH_ALL} from '../constants/action-types';

const ITEMS_REDUCER = (items = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...items, [action.itemType]: action.payload[action.itemType] }
    // TODO: Need to check below methods with feature additions
    case CREATE:
      return { ...items, [action.itemType]: action.payload[action.itemType] };
    case UPDATE:
    case LIKE:
      return items[action.itemType].map(item => (item._id === action.payload._id ? action.payload : item));
    case DELETE:
      return items[action.itemType].filter(item => item._id !== action.payload);
    default:
      return items;
  }
};

export default ITEMS_REDUCER;
