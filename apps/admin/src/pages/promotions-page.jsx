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

import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fetchPromotions} from '../api/promotions';

const DevicesPage = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchPromotions();
        setPromotions(response.promotions);
      } catch (error) {
        // Log error.
      }
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Promo Code</TableCell>
            <TableCell align="right">Discount Percentage</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promotions?.map(promotion => (
            <TableRow key={promotion._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell>{promotion.promoCode}</TableCell>
              <TableCell>{promotion.discount}%</TableCell>
              <TableCell align="right">{promotion.startDate}</TableCell>
              <TableCell align="right">{promotion.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DevicesPage;
