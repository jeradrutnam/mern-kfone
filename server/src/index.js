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

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const corsConfig = {
  credentials: true,
  origin: `${process.env.CLIENT_BASE_URL}`,
  methods: ['GET, OPTIONS, PATCH, DELETE, POST, PUT'],
  allowedHeaders: [
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,' +
      'Content-Type, Date, X-Api-Version',
  ],
};

// app.options('*', cors(corsConfig));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors({credentials: true, origin: `${process.env.CLIENT_BASE_URL}`}));
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send(`Kfone Services API v1.0.`);
});

if (process.env.MONGODB_URI) {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => {
      console.error(error.message);
    });
} else {
  console.log("Couldn't find MONGODB_URI in your environment.");
}
