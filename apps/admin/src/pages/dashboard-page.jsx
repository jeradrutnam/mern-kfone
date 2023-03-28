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
import {useTheme} from '@mui/material/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Generate Sales Data
function createData(time, amount) {
  return {time, amount};
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const items = [
  {
    description: 'Best broadband hub for working from home.',
    name: '5G Hub',
    price: 1499,
  },
  {
    description: '128GB Midnight',
    name: 'Apple iPhone 14 Pro',
    price: 999,
  },
  {
    description: '5G 128GB Black',
    name: 'Samsung Galaxy S22',
    price: 699,
  },
  {
    description: '128GB Obsidian Black',
    name: 'Google Pixel 7 Pro',
    price: 1299,
  },
  {
    description: 'FE 5G Green',
    name: 'Samsung Galaxy S20',
    price: 899,
  },
];

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Container maxWidth="" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <XAxis dataKey="time" stroke={theme.palette.text.secondary} style={theme.typography.body2} />
                  <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
                    <Label
                      angle={270}
                      position="left"
                      style={{
                        textAnchor: 'middle',
                        fill: theme.palette.text.primary,
                        ...theme.typography.body1,
                      }}
                    >
                      Sales Trends
                    </Label>
                  </YAxis>
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="amount"
                    stroke={theme.palette.primary.main}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <React.Fragment>
                <Title>Weekly Revenue</Title>
                <Typography component="p" variant="h4">
                  $3,024.00
                </Typography>
                <Typography color="text.secondary" sx={{flex: 1}}>
                  on {`${new Date().toLocaleDateString()}`}
                </Typography>
              </React.Fragment>
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
              <React.Fragment>
                <Title>Recent Orders</Title>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items?.map(item => (
                      <TableRow key={item._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
