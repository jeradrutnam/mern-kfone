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
  media: `${PREFIX}-media`,
  border: `${PREFIX}-border`,
  fullHeightCard: `${PREFIX}-full-height-card`,
  card: `${PREFIX}-card`,
  overlay: `${PREFIX}-overlay`,
  overlay2: `${PREFIX}-overlay2`,
  grid: `${PREFIX}-grid`,
  details: `${PREFIX}-details`,
  title: `${PREFIX}-title`,
  cardActions: `${PREFIX}-card-actions`,
  cardAdminActions: `${PREFIX}-card-admin-actions`,
};

export const StyleWrapper = styled('div')(({theme}) => ({
  [`&`]: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  [`& .${classes.media}`]: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  [`& .${classes.border}`]: {
    border: 'solid',
  },
  [`& .${classes.fullHeightCard}`]: {
    height: '100%',
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  [`& .${classes.overlay}`]: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  [`& .${classes.overlay2}`]: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  [`& .${classes.grid}`]: {
    display: 'flex',
  },
  [`& .${classes.details}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  [`& .${classes.title}`]: {
    padding: '0 16px',
  },
  [`& .${classes.cardActions}`]: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.cardAdminActions}`]: {
    color: 'white',
  },
}));
