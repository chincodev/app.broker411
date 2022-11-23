// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import Spinner from 'src/@core/components/spinner'
import CircularProgress from '@mui/material/CircularProgress'
import { businessService } from '../../../../services/business.service'
// ** Icons Imports
import React from 'mdi-material-ui/React'
import Vuejs from 'mdi-material-ui/Vuejs'
import Angular from 'mdi-material-ui/Angular'
import Laravel from 'mdi-material-ui/Laravel'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'
import axios from 'axios'
import CardSnippet from 'src/@core/components/card-snippet'
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import { Avatar, Button, CardContent, Divider, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material'
import { AccountOutline, BagPersonalOutline, Email, EmailOutline, FileOutline, LocationEnter, Map, Marker, MessageOutline, NaturePeople, Phone, Pin } from 'mdi-material-ui'
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { green } from '@mui/material/colors'
import InputMask from "react-input-mask";

const schema = yup.object().shape({
  contact_email: yup.string().required().oneOf(['broker']),
  phone: yup.string().min(1).max(128),
  address: yup.string().min(1).max(128).required(),
});


const DialogTabContact = (props) => {
 
  const { setUserData, userData, errors } = props

  return (
    <Box>
      {/* <Typography variant='h6' sx={{ mb: 4 }}>
        Add broker details
      </Typography> */}

     
       
          <Grid container>
        
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
               
                    <TextField
                      value={userData.contact_email}
                      label='Contact Email'
                      onChange={(e)=>setUserData({...userData, contact_email:e.target.value})}
                      placeholder='john@example.com'
                      error={errors && Array.isArray(errors) && errors.find(x => x.path.includes('contact_email'))}
                      aria-describedby='email'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Email />
                          </InputAdornment>
                        )
                      }}
                    />
                
              
                {errors && Array.isArray(errors) && errors.find(x => x.path.includes('contact_email')) && (
                  <FormHelperText sx={{ color: 'error.main' }} id='email'>
                    {errors && Array.isArray(errors) && errors.find(x => x.path.includes('contact_email')).message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                
                    <InputMask
                    mask="999 999 99 99"
                    value={userData.phone}
                    onChange={(e)=>setUserData({...userData, phone:e.target.value})}
                    maskChar=" "
                  >

                    {
                      ()=><TextField
                        fullWidth
                        // type='number'
                        label='Phone Number'
                        error={errors && Array.isArray(errors) && errors.find(x => x.path.includes('phone'))}
                        // value={formData.number}
                        placeholder='202 555 0111'
                        // // onChange={e => handleFormChange('number', e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                      />
                    }

                  </InputMask>
                   
                  {errors && Array.isArray(errors) && errors.find(x => x.path.includes('phone')) && (
                  <FormHelperText sx={{ color: 'error.main' }} id='phone'>
                    {errors && Array.isArray(errors) && errors.find(x => x.path.includes('phone')).message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
              <FormControl fullWidth>
                
                    <TextField
                      label='First & Last Name'
                      placeholder='John Doe'
                      value={userData.name}
                      onChange={(e)=>setUserData({...userData, name:e.target.value})}
                      error={errors && Array.isArray(errors) && errors.find(x => x.path.includes('name'))}
                      aria-describedby='address_line_2'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <FileOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  
                
                  {errors && Array.isArray(errors) && errors.find(x => x.path.includes('name')) && (
                  <FormHelperText sx={{ color: 'error.main' }} id='name'>
                    {errors && Array.isArray(errors) && errors.find(x => x.path.includes('name')).message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        
    

        {/* {
          actionsLoading ? (
            <Box sx={{ textAlign: 'center', marginTop:'4rem', marginBottom:'4rem' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {
                Object.keys(props.businessData).map(x => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      style={{borderBottom:'1px solid #b7b7b729'}}
                      sx={{ pb: 2, pt: 3 }}
                    >
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {labels[x]}
                    </Typography>
                    <Typography variant='caption'>{props.businessData[x]}</Typography>
                    </Grid>
                  )
                })
              }
            </Grid>
          )
        } */}
      </Box>
  )
}

export default DialogTabContact