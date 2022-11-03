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
import { Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, InputAdornment, Rating, TextField } from '@mui/material'
import { AccountOutline, Email, EmailOutline, FaceAgent, LocationEnter, Map, Marker, MessageOutline, OfficeBuildingOutline, Phone, Pin } from 'mdi-material-ui'
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { green } from '@mui/material/colors'


import useBgColor from 'src/@core/hooks/useBgColor'

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


  const bgClasses = useBgColor()
  
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
          <Box
            
                sx={{
                  py: 3,
                  px: 4,
                  mb: 4,
                  borderRadius: 1,
                  border: theme =>
                    `1px solid whitesmoke`,
                    
                }}
              >
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <OfficeBuildingOutline sx={{ mr: 2 }} />
                  <Typography variant='h6' sx={{ mb: 0}}>
                    Brokerage Name
                  </Typography>
                </Box>
                <Typography>
                  <strong>Broker Broker Broker</strong>
                </Typography>
              </Box>

              <Box
            
                sx={{
                  py: 3,
                  px: 4,
                  
                  borderRadius: 1,
                  border: theme =>
                    `1px solid whitesmoke`,
                }}
              >
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <FaceAgent sx={{ mr: 2 }} />
                  <Typography variant='h6' sx={{ mb: 0}}>
                    Brokerage Representative
                  </Typography>
                </Box>
                <Typography>
                  <strong>Broker Broker Broker</strong>
                </Typography>
              </Box>

            </Grid>
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
              <FormControl fullWidth>
                <Controller
                  name='body'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Body'
                      onChange={onChange}
                      placeholder='Describe your experience in 100 words.'
                      fullWidth
                      multiline
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      minRows={3}
                      error={Boolean(errors.registration_date)}
                      aria-describedby='registration_date'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <MessageOutline />
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
              <Typography variant='h6' >Check the box if any applies to you:</Typography>
            <FormGroup>
          <FormControlLabel
            label='No detention Pay'
            control={<Checkbox  name='gilad' />}
          />
          <FormControlLabel
            label='Cancels Load Before Pickup'
            control={<Checkbox  name='jason' />}
          />
          <FormControlLabel
            label='Double Booked'
            control={<Checkbox  name='antoine' />}
          />
          <FormControlLabel
            label='Rude or Disrespectful Broker Agent'
            control={<Checkbox  name='antoine' />}
          />
          <FormControlLabel
            label='Change of terms during transit'
            control={<Checkbox  name='antoine' />}
          />
          <FormControlLabel
            label='Gives wrong delivery or pickup times'
            control={<Checkbox  name='antoine' />}
          />
          <FormControlLabel
            label='Unresponsive after giving you the load'
            control={<Checkbox  name='antoine' />}
          />
          <FormControlLabel
            label='Leaves false reviews on other platforms '
            control={<Checkbox  name='antoine' />}
          />
        </FormGroup>
            </Grid>
            
            <Grid item xs={12} style={{marginBottom:'2rem'}}>
            <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 500 }}>Your experience</Typography>
        <Rating size="large" max={10} value={1} name='simple-controlled' onChange={(event, newValue) => console.log(newValue)} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 500 }}>Payment Speed</Typography>
        <Rating size="large" max={10} value={1} name='simple-controlled' onChange={(event, newValue) => console.log(newValue)} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 500 }}>Load was as described</Typography>
        <Rating size="large" max={10} value={1} name='simple-controlled' onChange={(event, newValue) => console.log(newValue)} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: 500 }}>Would you work with this company again</Typography>
        <Rating  size="large" max={10} value={1} name='simple-controlled' onChange={(event, newValue) => console.log(newValue)} />
      </Box>
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
