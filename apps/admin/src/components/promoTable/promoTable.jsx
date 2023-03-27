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

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(code, promoType, promoAmount, productIds, usage, expiary) {
  return {code, promoType, promoAmount, productIds, usage, expiary};
}

const rows = [
  createData('OCT54', 'Seasonal', '10%', '', '2/100', '23rd, Apr 2023'),
  createData('QJK56', 'Seasonal', '10%', '', '0/100', '23rd, Apr 2023'),
  createData('OCT54', 'Seasonal', '10%', '', '2/100', '23rd, Apr 2023'),
  createData('OCT54', 'Seasonal', '10%', '', '2/100', '23rd, Apr 2023'),
  createData('OCT54', 'Seasonal', '10%', '', '2/100', '23rd, Apr 2023'),
  createData('OCT54', 'Seasonal', '10%', '', '2/100', '23rd, Apr 2023'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Promotion Code</TableCell>
            <TableCell align="right">Promotion Type</TableCell>
            <TableCell align="right">Promotion Amount</TableCell>
            <TableCell align="right">Product IDs</TableCell>
            <TableCell align="right">Usage/Limit</TableCell>
            <TableCell align="right">Expiary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell>{row.code}</TableCell>
              <TableCell align="right">{row.promoType}</TableCell>
              <TableCell align="right">{row.promoAmount}</TableCell>
              <TableCell align="right">{row.productIds}</TableCell>
              <TableCell align="right">{row.usage}</TableCell>
              <TableCell align="right">{row.expiary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
