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

module.exports = {
  displayName: '@asgardeo-samples/mern-kfone-client',
  globals: {},
  moduleDirectories: ['node_modules', 'test-configs', __dirname],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test-configs/__mocks__/style-mock.js',
    '^@unit-testing(.*)$': '<rootDir>/test-configs/utils',
  },
  modulePaths: ['<rootDir>'],
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/test-configs/setup-test.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/**/?(*.)test.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/(dist|node_modules)/'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/?(?!@wso2)'],
  verbose: true,
};
