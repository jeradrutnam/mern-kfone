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
  border: `${PREFIX}-border`,
  card: `${PREFIX}-card`,
  cardActions: `${PREFIX}-card-actions`,
  cardAdminActions: `${PREFIX}-card-admin-actions`,
  details: `${PREFIX}-details`,
  fullHeightCard: `${PREFIX}-full-height-card`,
  grid: `${PREFIX}-grid`,
  media: `${PREFIX}-media`,
  overlay: `${PREFIX}-overlay`,
  overlay2: `${PREFIX}-overlay2`,
  title: `${PREFIX}-title`,
};

export const StyleWrapper = styled('div')(({theme}) => ({
  [`&`]: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  [`& .${classes.media}`]: {
    backgroundBlendMode: 'darken',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 0,
    paddingTop: '56.25%',
  },
  [`& .${classes.border}`]: {
    border: 'solid',
  },
  [`& .${classes.fullHeightCard}`]: {
    height: '100%',
  },
  [`& .${classes.card}`]: {
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  [`& .${classes.overlay}`]: {
    color: 'white',
    left: '20px',
    position: 'absolute',
    top: '20px',
  },
  [`& .${classes.overlay2}`]: {
    color: 'white',
    position: 'absolute',
    right: '20px',
    top: '20px',
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
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px 8px 16px',
  },
  [`& .${classes.cardAdminActions}`]: {
    color: 'white',
  },
}));
