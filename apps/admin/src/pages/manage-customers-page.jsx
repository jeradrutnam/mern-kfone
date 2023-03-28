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
import {fetchCustomers, createCustomer} from '../api/customers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
  emails: [{primary: true, value: ''}],
  name: {familyName: '', givenName: ''},
  password: '',
  userName: '',
};

export default function ManageCustomers() {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formMode, setFormMode] = useState('ADD');
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchCustomers();
        setCustomers(response.Resources);
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

  const handleCustomerCreateUpdate = async e => {
    e.preventDefault();

    let _formData = {
      ...formData,
      userName: `DEFAULT/${formData.emails[0].value}`,
    };

    await createCustomer(_formData);
    // try {
    //   if (formMode === 'ADD') {
    //     const response = await createDevice(formData);

    //     if (response) {
    //       setCustomers([...customers, response.device]);
    //     }
    //   } else {
    //     const response = await updateDevice(formData._id, formData);

    //     if (response) {
    //       const updatedDevices = customers.map(device => {
    //         if (device._id === response._id) {
    //           return response;
    //         }

    //         return device;
    //       });

    //       setCustomers(updatedDevices);
    //     }
    //   }

    //   handleClose();
    // } catch (error) {
    //   // Log error.
    // }
  };

  const handleCustomerDelete = async id => {
    // try {
    //   await deleteDevice(id);
    //   const updatedDevices = customers.filter(device => device._id !== id);
    //   setCustomers(updatedDevices);
    // } catch (e) {
    //   // Log error.
    // }
  };

  const handleCustomerUpdate = device => {
    setFormData(device);
  };

  const renderModal = () => {
    const header = formMode === 'ADD' ? 'Add New Customer' : 'Edit Customer';
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

          <Box component="form" noValidate onSubmit={handleCustomerCreateUpdate} sx={{mt: 3}}>
            <TextField
              sx={{mb: 3}}
              fullWidth
              required
              label="Email"
              value={formData.emails[0]?.value}
              onChange={e => setFormData({...formData, emails: [{primary: true, value: e.target.value}]})}
            />
            <TextField
              sx={{mb: 3}}
              fullWidth
              maxRows={4}
              label="First Name"
              value={formData.name?.givenName}
              onChange={e => setFormData({...formData, name: {...formData.name, givenName: e.target.value}})}
            />
            <TextField
              sx={{mb: 3}}
              fullWidth
              maxRows={4}
              label="Last Name"
              value={formData.name?.familyName}
              onChange={e => setFormData({...formData, name: {...formData.name, familyName: e.target.value}})}
            />
            <TextField
              inputProps={{
                type: 'password',
              }}
              sx={{mb: 3}}
              fullWidth
              maxRows={4}
              label="Password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
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
        <Typography variant="h4">Manage Customers</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Add, edit and delete customers and manage tiers.
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField size="Normal" variant="filled" fullWidth label="Search..." id="fullWidth" />
        </Grid>
        <Grid item xs={8}>
          <Fab onClick={() => handleOpen('ADD')} variant="extended" size="medium" color="primary" aria-label="add">
            <AddIcon sx={{mr: 1}} />
            Add Customers
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
                <TableCell align="right">id</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.map(customer => (
                <TableRow key={customer.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <Avatar
                        alt={customer.emails[0]}
                        src={customer['urn:scim:wso2:schema'].photoUrl}
                        src={customer['urn:scim:wso2:schema'].photoUrl}
                        height={40}
                        width={40}
                      />
                      {customer.name?.familyName || customer.name?.givenName
                        ? `${customer.name?.familyName} ${customer.name?.givenName}`
                        : customer.emails[0]}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{customer.id}</TableCell>
                  <TableCell align="right">{customer.userName}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        handleOpen('EDIT');
                        handleCustomerUpdate(customer);
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
                      onClick={() => handleCustomerDelete(customer._id)}
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
}
