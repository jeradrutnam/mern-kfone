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

import express from 'express';
import {createService, deleteService, getServices, updateService} from '../controllers/services.js';
import {isValidAccessToken} from '../middlewares/auth.js';

// Create a new Router instance from the Express.js package
const router = express.Router();

// Define the routes for the services API
router.get('/', getServices); // Get all services
router.post('/', isValidAccessToken, createService); // Create a new service
router.put('/:id', isValidAccessToken, updateService); // Update an existing service
router.patch('/:id', isValidAccessToken, updateService); // Partially update an existing service
router.delete('/:id', isValidAccessToken, deleteService); // Delete an existing service

export default router;
