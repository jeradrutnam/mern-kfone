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
import {fetchDevices, createDevice, updateDevice, deleteDevice} from '../api/devices';
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
import FileBase from 'react-file-base64';

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

const DEFAULT_FORM_VALUES = {
  description: '',
  name: '',
  price: '',
  image: '',
};

const DevicesPage = () => {
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [formMode, setFormMode] = useState('ADD');
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchDevices();
        setDevices(response.devices);
      } catch (error) {
        // Log error.
      }
    })();
  }, []);

  const handleOpen = mode => {
    setFormMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(DEFAULT_FORM_VALUES);
  };

  const handleDeviceCreateUpdate = async e => {
    e.preventDefault();

    try {
      if (formMode === 'ADD') {
        const response = await createDevice(formData);

        if (response) {
          setDevices([...devices, response.device]);
        }
      } else {
        const response = await updateDevice(formData._id, formData);

        if (response) {
          const updatedDevices = devices.map(device => {
            if (device._id === response._id) {
              return response;
            }

            return device;
          });

          setDevices(updatedDevices);
        }
      }

      handleClose();
    } catch (error) {
      // Log error.
    }
  };

  const handleDeviceDelete = async id => {
    try {
      await deleteDevice(id);

      const updatedDevices = devices.filter(device => device._id !== id);
      setDevices(updatedDevices);
    } catch (e) {
      // Log error.
    }
  };

  const handleDeviceUpdate = device => {
    setFormData(device);
  };

  const renderModal = () => {
    const header = formMode === 'ADD' ? 'Add New Device' : 'Edit Device';
    const action = formMode === 'ADD' ? 'Add' : 'Edit';

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {header}
          </Typography>

          <Box component="form" noValidate onSubmit={handleDeviceCreateUpdate} sx={{mt: 3}}>
            <TextField
              sx={{mb: 3}}
              fullWidth
              required
              id="outlined-required"
              label="Device Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <TextField
              sx={{mb: 3}}
              fullWidth
              multiline
              maxRows={4}
              id="outlined-required"
              label="Description"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
            <FormControl sx={{mb: 3}} fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Price"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </FormControl>
            <FileBase type="file" multiple={false} onDone={({base64}) => setFormData({...formData, image: base64})} />
            <Divider sx={{pb: 3}} variant="fullWidth" />
            <Button style={modalButton} type="submit" variant="contained">
              {action}
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box>
      <div style={headingStyle}>
        <Typography variant="h4">Devices</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage Devices: Add, Update, and Delete with Ease
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField size="Normal" variant="filled" fullWidth label="Search..." id="fullWidth" />
        </Grid>
        <Grid item xs={8}>
          <Fab onClick={() => handleOpen('ADD')} variant="extended" size="medium" color="primary" aria-label="add">
            <AddIcon sx={{mr: 1}} />
            Add Devices
          </Fab>
          {renderModal()}
        </Grid>
      </Grid>

      <div style={tableStyle}>
        <TableContainer style={tableStyle} component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices?.map(device => (
                <TableRow key={device._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <img alt={device.name} src={device.image} height={40} width={40} />
                      {device.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{device.price}</TableCell>
                  <TableCell align="right">{device.description}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        handleOpen('EDIT');
                        handleDeviceUpdate(device);
                      }}
                      color="primary"
                      aria-label="edit device"
                      component="label"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="red"
                      aria-label="edit device"
                      component="label"
                      onClick={() => handleDeviceDelete(device._id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default DevicesPage;
