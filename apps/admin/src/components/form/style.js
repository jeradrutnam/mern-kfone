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

import {styled} from '@mui/material/styles';

const PREFIX = 'custom';

export const classes = {
  buttonClear: `${PREFIX}-button-clear`,
  buttonSubmit: `${PREFIX}-button-submit`,
  fileInput: `${PREFIX}-file-input`,
  form: `${PREFIX}-form`,
  paper: `${PREFIX}-paper`,
  root: `${PREFIX}-root`,
};

export const StyleWrapper = styled('div')(({theme}) => ({
  [`& .${classes.root} .MuiTextField-root`]: {
    margin: theme.spacing(1),
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  [`& .${classes.fileInput}`]: {
    margin: '10px 0',
    width: '97%',
  },
  [`& .${classes.buttonSubmit}`]: {
    margin: 8,
  },
  [`& .${classes.buttonClear}`]: {
    margin: 8,
    marginTop: 0,
  },
}));
