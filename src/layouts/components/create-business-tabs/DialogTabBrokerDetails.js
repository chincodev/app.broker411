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
import { Button, CardContent, Divider, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material'
import { AccountOutline, Email, EmailOutline, LocationEnter, Map, Marker, MessageOutline, Phone, Pin } from 'mdi-material-ui'
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { green } from '@mui/material/colors'

const schema = yup.object().shape({
  type: yup.string().required().oneOf(['broker']),
  legal_name: yup.string().min(1).max(128),
  address: yup.string().min(1).max(128).required(),
  address_line_2: yup.string().min(1).max(128).required(),
  phone: yup.string().min(1).max(32).required(),
  email: yup.string().min(8).max(32).required(),
  mc_number: yup.number().min(1).max(999999999999).required(),
  registration_date: yup.date().required()
});


const DialogTabBrokerDetails = (props) => {

  const [ actionsLoading, setActionsLoading ] = useState(false)

  const defaultValues = {
    type: 'broker',
    legal_name: '',
    address: '',
    address_line_2: '',
    phone: '',
    email: '',
    mc_number: '',
    registration_date: ''
  }

  const { register, control, handleSubmit, formState: { errors }, reset, setError } = useForm({
    resolver: yupResolver(schema), defaultValues
  });

  const submitData = async (data) => {
    try {
      setActionsLoading(true)
      await businessService.create(data)
      setActionsLoading(false)
      toast.success('Your request has been submitted. A representative will reach out to you soon.')
      props.setVerify(true)
      props.handleClose(true)
    } catch (er) {
      
      er.errors && Array.isArray(er.errors) && er.errors.map(x => {
        if(x.path){
          x.path.map(y => setError(y, {
            message: x.message
          }))
        } else {
          toast.error(x.message)
        }
      })
      
      setActionsLoading(false)
      console.log(er)
    }
  }

  return (
    <Box>
      {/* <Typography variant='h6' sx={{ mb: 4 }}>
        Add broker details
      </Typography> */}
      {console.log(errors)}
     
        <form onSubmit={handleSubmit(submitData)}>
          <Grid container>
          <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='mc_number'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='MC Number'
                      onChange={onChange}
                      placeholder='123123'
                      type={'number'}
                      error={Boolean(errors.name)}
                      aria-describedby='mc_number'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.mc_number && (
                  <FormHelperText sx={{ color: 'error.main' }} id='mc_number'>
                    {errors.mc_number.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='registration_date'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Registration Date'
                      onChange={onChange}
                      placeholder='123123'
                      type={'date'}
                      error={Boolean(errors.registration_date)}
                      aria-describedby='registration_date'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.registration_date && (
                  <FormHelperText sx={{ color: 'error.main' }} id='registration_date'>
                    {errors.registration_date.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='legal_name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Name'
                      onChange={onChange}
                      placeholder='AI Logistics Inc'
                      error={Boolean(errors.legal_name)}
                      aria-describedby='legal_name'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.legal_name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='legal_name'>
                    {errors.legal_name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Email'
                      onChange={onChange}
                      placeholder='ailogistics@example.com'
                      error={Boolean(errors.email)}
                      aria-describedby='email'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Email />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id='email'>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Phone'
                      onChange={onChange}
                      placeholder='(123) 456-8790'
                      error={Boolean(errors.phone)}
                      aria-describedby='phone'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Phone />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.phone && (
                  <FormHelperText sx={{ color: 'error.main' }} id='phone'>
                    {errors.phone.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='address'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Address'
                      placeholder='123022 Ashwood St'
                      onChange={onChange}
                      error={Boolean(errors.address)}
                      aria-describedby='address'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Pin />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.address && (
                  <FormHelperText sx={{ color: 'error.main' }} id='address'>
                    {errors.address.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='address_line_2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label=''
                      placeholder='Kannapolis NC 28081'
                      onChange={onChange}
                      error={Boolean(errors.address_line_2)}
                      aria-describedby='address_line_2'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Pin />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.address_line_2 && (
                  <FormHelperText sx={{ color: 'error.main' }} id='address_line_2'>
                    {errors.address_line_2.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
           
            <Grid item xs={12} style={{textAlign:'end', paddingTop:'1em'}}>
              <Button type='submit' disabled={actionsLoading} color='secondary' onClick={()=>reset()} variant='contained' size='large'>
                Reset
              </Button>&nbsp;&nbsp;
              <Button type='submit' disabled={actionsLoading} variant='contained' size='large'>
                {
                  actionsLoading && <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                }
                Submit
              </Button>
            </Grid> 
          </Grid>
        </form>
    

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

export default DialogTabBrokerDetails