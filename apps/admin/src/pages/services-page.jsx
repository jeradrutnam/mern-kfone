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
import {fetchServices} from '../api/services';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
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

const ServicesPage = () => {
    const [services, setServices] = useState([]);
  
    useEffect(() => {
      (async () => {
        try {
          const response = await fetchServices();
          setServices(response.items);
        } catch (error) {
          // Log error.
        }
      })();
    }, []);

    const serviceTypes = ['Wireless Services', 'Internet Services', 'Cloud Services'];
    const [value, setValue] = React.useState(services[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [openEdit, setEditOpen] = React.useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const servicesData = [
        { name: 'Satellite Television', serviceType: 'Wireless Services', description: 'Lorem Ipsum', price: '$990' },
        { name: 'Lorem Ipsum', serviceType: 'Internet Services', description: 'Lorem Ipsum', price: '$790' },
        { name: 'abc', serviceType: 'Wireless Services', description: 'Lorem Ipsum', price: '$990' },
    ]
  
    const fabStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 'auto',
      left: 'auto',
      position: 'fixed',
    };
  
    const tableStyle = {
      marginTop: 56,
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
        <Typography variant="h4">Services</Typography>
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
            Add Services
          </Fab>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Services
              </Typography>
              <Typography id="modal-modal-description" sx={{mt: 2}}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <div>
                <TextField fullWidth required id="outlined-required" label="Service Name" />,
                <TextField fullWidth multiline maxRows={4} id="outlined-required" label="Description" />,
                <Autocomplete
                    required
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="Service Type"
                    options={serviceTypes}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Service Type" />}
                />,
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>
                ,
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
        <TableContainer style={tableStyle} component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Service Type</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesData?.map(service => (
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell align="left">{service.serviceType}</TableCell>
                  <TableCell align="left">{service.description}</TableCell>
                  <TableCell align="right">{service.price}</TableCell>
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
      </div>
      <Modal
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Services
              </Typography>
              <Typography id="modal-modal-description" sx={{mt: 2}}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <div>
                <TextField fullWidth required id="outlined-required" label="Service Name" />,
                <TextField fullWidth multiline maxRows={4} id="outlined-required" label="Description" />,
                <Autocomplete
                    required
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="Service Type"
                    options={serviceTypes}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Service Type" />}
                />,
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>
                ,
              </div>
              <Divider variant="fullWidth" />
              <Button style={modalButton} variant="contained">
                Edit
              </Button>
            </Box>
          </Modal>
    </Box>
  );
};

export default ServicesPage;
