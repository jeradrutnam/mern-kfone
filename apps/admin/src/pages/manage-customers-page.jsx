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
import {fetchCustomers, createCustomer, createCustomerReference} from '../api/customers';
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
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {UserTiers} from '../models/user';

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
  tier: UserTiers.Silver,
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

    const {tier, ...userInfo} = {...formData};

    let _formData = {
      ...userInfo,
      userName: `DEFAULT/${formData.emails[0].value}`,
      'urn:scim:wso2:schema': {
        tier,
      },
    };

    try {
      if (formMode === 'ADD') {
        const response = await createCustomer(_formData);

        if (response) {
          await createCustomerReference(response.id);
          setCustomers([...customers, response]);
        }
      }

      handleClose();
    } catch (error) {
      // Log error.
    }
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
            <Stack spacing={3}>
              <Autocomplete
                required
                options={Object.values(UserTiers)}
                getOptionLabel={option => option}
                filterSelectedOptions
                renderInput={params => <TextField {...params} label="Select Tier" />}
                value={formData.tier}
                defaultValue={Object.values(UserTiers)[0]}
                onChange={(e, newValue) => {
                  setFormData({...formData, tier: newValue});
                }}
              />
            </Stack>
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
        <Grid item xs>
          <TextField size="Normal" variant="filled" fullWidth label="Search..." id="fullWidth" />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs style={{display: 'flex', justifyContent: 'flex-end'}}>
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
                <TableCell align="right">Domain</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
}
