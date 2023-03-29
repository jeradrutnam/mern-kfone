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

// Define the schema for the users collection
const userSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
    },
    createdAt: {
      default: Date.now,
      type: Date,
    },
    favorited: {
      required: false,
      default: [],
      type: [{ref: 'Item', type: mongoose.Schema.Types.ObjectId}],
    },
    cart: {
      required: false,
      default: [],
      type: [{ ref: 'Item', type: mongoose.Schema.Types.ObjectId }],
    },
    points: {
      required: true,
      default: 0,
      type: Number,
    },
  },
  {_id: false},
);

// Create a Mongoose model for the users collection, based on the userSchema
const User = mongoose.model('User', userSchema);

export default User;
