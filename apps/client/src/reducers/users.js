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

import {USER_FETCH, USER_FOLLOW, USER_REMOVE_FOLLOW, USER_ADD_CART, USER_REMOVE_CART} from '../constants/action-types';

const USER_REDUCER = (user = null, action) => {
  switch (action.type) {
    case USER_FETCH:
      return action.payload;

    case USER_FOLLOW:
      const newFavorited = user.favorited;
      newFavorited.push(action.payload);
      return {...user, favorited: newFavorited};

    case USER_REMOVE_FOLLOW:
      const favorited = user.favorited.filter(item => {
        return item !== action.payload;
      });
      return {...user, favorited};

    case USER_ADD_CART:
      const newCart = user.cart;
      newCart.push(action.payload);
      return {...user, cart: newCart};

    case USER_REMOVE_CART:
      const cart = user.cart.filter(item => {
        return item !== action.payload;
      });
      return {...user, cart};

    default:
      return user;
  }
};

export default USER_REDUCER;
