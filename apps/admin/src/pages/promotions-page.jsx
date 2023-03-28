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
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fetchPromotions, createPromotion, updatePromotion, deletePromotion} from '../api/promotions';
import {fetchDevices} from '../api/devices';
import {fetchServices} from '../api/services';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
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
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {MultiInputDateTimeRangeField} from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';

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

const DEFAULT_FORM_VALUES = {
  description: '',
  name: '',
  discount: '',
  startDate: dayjs(new Date()),
  endDate: dayjs(new Date()),
  tags: [],
};

const date1 = dayjs('2022-04-17T15:30');
const date2 = dayjs('2022-04-21T18:30');

const PromotionsPage = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [formMode, setFormMode] = useState('ADD');
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);

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

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchDevices();
        setItems([...items, ...response.devices]);
      } catch (error) {
        // Log error.
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchServices();
        setItems([...items, ...response.services]);
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

  const handlePromotionCreateUpdate = async e => {
    e.preventDefault();

    try {
      if (formMode === 'ADD') {
        const response = await createPromotion(formData);

        if (response) {
          setPromotions([...promotions, response.promotion]);
        }
      } else {
        const response = await updatePromotion(formData._id, formData);

        if (response) {
          const updatedPromotions = promotions.map(promotion => {
            if (promotion._id === response._id) {
              return response;
            }

            return promotion;
          });

          setPromotions(updatedPromotions);
        }
      }

      handleClose();
    } catch (error) {
      // Log error.
    }
  };

  const handlePromotionDelete = async id => {
    try {
      await deletePromotion(id);

      const updatedPromotions = promotions.filter(promotion => promotion._id !== id);
      setPromotions(updatedPromotions);
    } catch (e) {
      // Log error.
    }
  };

  const handlePromotionUpdate = promotion => {
    setFormData(promotion);
  };

  const renderModal = () => {
    const header = formMode === 'ADD' ? 'Add New Promotion' : 'Edit Promotion';
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

          <Box component="form" noValidate onSubmit={handlePromotionCreateUpdate} sx={{mt: 3}}>
            <TextField
              sx={{mb: 3}}
              fullWidth
              required
              label="Promotion Code"
              value={formData.promoCode}
              onChange={e => setFormData({...formData, promoCode: e.target.value})}
            />
            <TextField
              sx={{mb: 3}}
              fullWidth
              multiline
              maxRows={4}
              label="Description"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
            <TextField
              sx={{mb: 3}}
              fullWidth
              multiline
              maxRows={4}
              label="Discount Percentage"
              value={formData.discount}
              onChange={e => setFormData({...formData, discount: e.target.value})}
            />
            <Stack spacing={3}>
              <Autocomplete
                required
                multiple
                options={items}
                getOptionLabel={option => option?.name}
                filterSelectedOptions
                renderInput={params => <TextField {...params} label="Select Items" />}
                value={formData.items}
                onChange={(e, newValue) => {
                  setFormData({...formData, items: newValue});
                }}
              />
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{mt: 2}}
                components={[
                  'SingleInputDateRangeField',
                  'MultiInputDateRangeField',
                  'SingleInputTimeRangeField',
                  'MultiInputTimeRangeField',
                  'MultiInputDateTimeRangeField',
                  'SingleInputDateTimeRangeField',
                ]}
              >
                <DemoItem label="Promotion Time Period" component="MultiInputDateTimeRangeField">
                  <MultiInputDateTimeRangeField defaultValue={[date1, date2]} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
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
        <Typography variant="h4">Promotions</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage Promotions: Add, Update, and Delete with Ease
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField size="Normal" variant="filled" fullWidth label="Search..." id="fullWidth" />
        </Grid>
        <Grid item xs={8}>
          <Fab
            onClick={() => handleOpen('ADD')}
            style={fabStyle}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
          >
            <AddIcon sx={{mr: 1}} />
            Add Promotions
          </Fab>
          {renderModal()}
        </Grid>
      </Grid>

      <div style={tableStyle}>
        <TableContainer style={tableStyle} component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">Expiry Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotions?.map(promotion => (
                <TableRow key={promotion._id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell>{promotion.promoCode}</TableCell>
                  <TableCell align="right">{promotion.discount}</TableCell>
                  <TableCell align="right">{promotion.description}</TableCell>
                  <TableCell align="right">{promotion.startDate}</TableCell>
                  <TableCell align="right">{promotion.endDate}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        handleOpen('EDIT');
                        handlePromotionUpdate(promotion);
                      }}
                      color="primary"
                      aria-label="edit promotion"
                      component="label"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="red"
                      aria-label="edit promotion"
                      component="label"
                      onClick={() => handlePromotionDelete(promotion._id)}
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

export default PromotionsPage;
