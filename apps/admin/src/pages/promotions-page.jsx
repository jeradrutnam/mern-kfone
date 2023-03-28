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
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';

import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';


const date1 = dayjs('2022-04-17T15:30');
const date2 = dayjs('2022-04-21T18:30');

const PromotionsPage = () => {
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

  
  const devices = [
    { device: 'iPhone 14', brand: 'Apple' },
    { device: 'iPhone 14', brand: 'Apple' },
    { device: 'iPhone 14', brand: 'Apple' },
    { device: 'iPhone 14', brand: 'Apple' },
    { device: 'iPhone 14', brand: 'Apple' },
  ]

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed',
  };

  const tableStyle = {
    marginTop: 36,
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };

  const modalButton = {
    marginTop: 24,
  };

  const headingStyle = {
    paddingBottom: 36,
  };

  return (
    <Box>
      <div style={headingStyle}>
        <Typography variant="h4">Promotions</Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        </Typography>
        <Divider variant="fullWidth" />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField size="Normal" variant="filled" fullWidth label="Search..." id="fullWidth" />
        </Grid>
        <Grid item xs={8}>
          <Fab onClick={handleOpen} style={fabStyle} variant="extended" size="medium" color="primary" aria-label="add">
            <AddIcon sx={{mr: 1}} />
            Add Promotion
          </Fab>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Promotion
              </Typography>
              <Typography id="modal-modal-description" sx={{mt: 2}}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <div>
                <TextField fullWidth required id="outlined-required" label="Promo Code" />,
                <TextField fullWidth multiline maxRows={4} id="outlined-required" label="Description" />,
                <TextField
                    required
                    fullWidth
                    label="Discount"
                    id="outlined-start-adornment"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    />,

                    <Stack spacing={3}>
                       <Autocomplete
                            required
                            multiple
                            id="tags-outlined"
                            options={devices}
                            getOptionLabel={(option) => option.device}
                            defaultValue={[devices[2]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Devices"
                                placeholder="Favorites"
                            />
                            )}
                        />
                    </Stack>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                        'SingleInputDateRangeField',
                        'MultiInputDateRangeField',
                        'SingleInputTimeRangeField',
                        'MultiInputTimeRangeField',
                        'MultiInputDateTimeRangeField',
                        'SingleInputDateTimeRangeField',
                        ]}
                    >
                    <DemoItem
                        label="Promotion Time Period"
                        component="MultiInputDateTimeRangeField"
                        >
                        <MultiInputDateTimeRangeField defaultValue={[date1, date2]} />
                        </DemoItem>
                    </DemoContainer>
                    </LocalizationProvider>

              </div>
              <Divider variant="fullWidth" />
              <Button style={modalButton} variant="contained">
                Add
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
      <div style={tableStyle}>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Promo Code</TableCell>
                <TableCell align="right">Discount Percentage</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotions?.map(promotion => (
                <TableRow key={promotion._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell>{promotion.promoCode}</TableCell>
                  <TableCell>{promotion.discount}%</TableCell>
                  <TableCell align="right">{promotion.startDate}</TableCell>
                  <TableCell align="right">{promotion.endDate}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleEditOpen} color="primary" aria-label="edit device" component="label">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="red" aria-label="edit device" component="label">
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Promotion
              </Typography>
              <Typography id="modal-modal-description" sx={{mt: 2}}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <div>
                <TextField fullWidth required id="outlined-required" label="Promo Code" />,
                <TextField fullWidth multiline maxRows={4} id="outlined-required" label="Description" />,
                <TextField
                    required
                    fullWidth
                    label="Discount"
                    id="outlined-start-adornment"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    />,

                    <Stack spacing={3}>
                       <Autocomplete
                            required
                            multiple
                            id="tags-outlined"
                            options={devices}
                            getOptionLabel={(option) => option.device}
                            defaultValue={[devices[2]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Devices"
                                placeholder="Favorites"
                            />
                            )}
                        />
                    </Stack>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                        'SingleInputDateRangeField',
                        'MultiInputDateRangeField',
                        'SingleInputTimeRangeField',
                        'MultiInputTimeRangeField',
                        'MultiInputDateTimeRangeField',
                        'SingleInputDateTimeRangeField',
                        ]}
                    >
                    <DemoItem
                        label="Promotion Time Period"
                        component="MultiInputDateTimeRangeField"
                        >
                        <MultiInputDateTimeRangeField defaultValue={[date1, date2]} />
                        </DemoItem>
                    </DemoContainer>
                    </LocalizationProvider>

              </div>
              <Divider variant="fullWidth" />
              <Button style={modalButton} variant="contained">
                Add
              </Button>
            </Box>
          </Modal>
      </div>
    </Box>
  );
};

export default PromotionsPage;
