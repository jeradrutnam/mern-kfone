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
  mainContainer: `${PREFIX}-main-container`,
  mainContainerItem: `${PREFIX}-main-container-item`,
  smMargin: `${PREFIX}-sm-margin`,
  actionDiv: `${PREFIX}-action-div`,
};

export const StyleWrapper = styled('div')(({theme}) => ({
  [`& .${classes.mainContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    [`& .${classes.mainContainerItem}`]: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  [`& .${classes.smMargin}`]: {
    margin: theme.spacing(1),
  },
  [`& .${classes.actionDiv}`]: {
    textAlign: 'center',
  },
}));
