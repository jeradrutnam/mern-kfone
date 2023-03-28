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

// Define the schema for the devices collection
const serviceSchema = mongoose.Schema({
  createdAt: {
    default: Date.now,
    type: Date,
  },
  description: {
    required: true,
    type: String,
  },
  favorited: {
    required: false,
    type: Boolean,
  },
  name: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  promotions: {
    default: [],
    type: [{ref: 'Promotion', type: mongoose.Schema.Types.ObjectId}],
  },
  serviceType: {
    required: true,
    type: String,
    enum: ['Wireless', 'Internet', 'Cloud'],
  },
});

// Create a Mongoose model for the devices collection, based on the deviceSchema
const Service = mongoose.model('Service', serviceSchema);

export default Service;
