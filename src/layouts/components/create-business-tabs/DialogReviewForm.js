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
import { Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, InputAdornment, Rating, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { AccountOutline, DeleteOutline, Email, EmailOutline, FaceAgent, LocationEnter, Map, Marker, MessageOutline, OfficeBuildingOutline, Phone, Pin, ThumbDown, ThumbUp, Upload } from 'mdi-material-ui'
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { green } from '@mui/material/colors'


import useBgColor from 'src/@core/hooks/useBgColor'
import { fetchData } from 'src/store/apps/field'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { size } from 'lodash'
import { reviewService } from 'services/review.service'
import PageHeader from 'src/@core/components/page-header'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import Link from 'next/link'
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dktj4vsgn/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'to5mrjqd';



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


const DialogReviewForm = (props) => {

  const { business } = props

  const bgClasses = useBgColor()
  
  const [ actionsLoading, setActionsLoading ] = useState(false)
  const [ submitting, setSubmitting ] = useState(false)
  const store = useSelector(state => state.fields)
  const dispatch = useDispatch()

  useEffect(() => {
    if(store.data.length === 0){
      dispatch(fetchData('?page_size=50'))
    }
  }, [])
  

  const [ type, setType ] = useState('good')
  const [ body, setBody ] = useState('')
  const [ representativeName, setRepresentativeName ] = useState('')
  const [ experience_rate, setExperience_rate ] = useState(1)
  const [ categories, setCategories ] = useState([])

  const reset = () => {
    setType('good')
    setBody('')
    setExperience_rate(1)
    setCategories([])
  }

  const [files, setFiles] = useState([])

  const submitData = async (e) => {
    try {
      e.preventDefault()

      
      console.log('asdas');
      console.log(files);

      let imageUrls = []

        await Promise.all(files.map(async image => {
          const formData = new FormData();
          files.map(x => formData.append('file', image))
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
          try {
            let response = await fetch(CLOUDINARY_URL, {
              method: 'POST',
              body: formData,
            })
            let data = await response.json()

            if (data.secure_url !== '') {
              const uploadedFileUrl = data.secure_url;
              imageUrls.push(uploadedFileUrl)
            }
          } catch(er) {
            console.error(er)
          }
            
        }))

      setSubmitting(true)
      await reviewService.create({
        rating: experience_rate,
        type,
        ...(imageUrls.length > 0 && {pictures:imageUrls}),
        body,
        representative_name: representativeName,
        categories,
        business_id: business.id
      })
      setSubmitting(false)
      toast.success('Review Sent')
      props.handleClose(true)
    } catch (er) {
      console.log(er)
      toast.error(er.errors[0].message)
      setSubmitting(false)
    }
  }

  if(store.loading){
    return <Box style={{textAlign:'center', width:'100%'}}>
      <CircularProgress disableShrink sx={{ mt: 6, mb: 6 }} />
    </Box>
  }

  return (
    <Box>
        <form onSubmit={(e)=>submitData(e)}>
          
          <Grid container>
          <Grid item xs={12} style={{marginBottom:'0rem'}}>
          <Box
            
                sx={{
                  py: 2,
                  px: 4,
                  mb: 2,
                  borderRadius: 1,
                  border: theme =>
                    `1px solid whitesmoke`,
                    
                }}
              >
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  <OfficeBuildingOutline sx={{ mr: 2 }} />
                  <Typography variant='body' sx={{ mb: 0, fontSize:'14px'}}>
                    Brokerage Name
                  </Typography>
                </Box>
                <Typography sx={{ml:8, fontSize:'12px'}} variant='body2'>
                
                  {business.legal_name}
                </Typography>
              </Box>

              {/* <Box
            
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
                  <strong>DISABLED TEMPORARLLY</strong>
                </Typography>
              </Box> */}

            </Grid>
            <FormControl fullWidth>
                
                    <TextField
                      value={representativeName}
                      label='Representative name (Optional)'
                      onChange={(e)=>setRepresentativeName(e.target.value)}
                      placeholder='Ex: John Doe'
                      fullWidth
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      aria-describedby='registration_date'
                      inputProps={{
                        maxLength: 64,
                      }}
                     
                    />
                 
              </FormControl>
            
            <Grid item xs={12} style={{marginTop:'0.5rem', marginBottom:'0.5rem', display:'flex', flexDirection:'column'}}>
              {/* <Typography style={{marginBottom:'0.5rem', fontWeight:'700'}} variant='h7'>Overall experience:</Typography> */}
              <ToggleButtonGroup size='small' exclusive color={type === 'good' ? 'success' : 'error'} value={type} onChange={(e)=>{
                setCategories([])
                setType(e.target.value)
              }}>
                
                <ToggleButton value='good'>Good</ToggleButton>
                <ToggleButton value='bad'>Bad</ToggleButton>
              </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
              {/* <Typography variant='h6' >Check the box if any applies to you:</Typography>  */}
            <FormGroup>
             <Grid container>

             
            {
              store.data.filter(x => x.type === type).map(x => <Grid xs={12} md={6} item>
                <FormControlLabel
               
                label={<Typography sx={{
                  fontSize: {
                    lg: 16,
                    md: 16,
                    sm: 12,
                    xs: 12
                  }
                }}>{x.description}</Typography>}
                control={<Checkbox
               
                  checked={categories.find(y => y === x.id) ? true : false}
                  onChange={(e)=>e.target.checked ? categories.find(y => y === x.id) ? '' : setCategories(categories.concat(x.id)) : setCategories(categories.filter(y => y != x.id))}
                  name={x.name} 
                />}
              />
              </Grid>)
            }
          </Grid>
        </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <Typography style={{marginBottom:'0.5rem', fontWeight:'700'}} variant='h7'>Your experience:</Typography>
      
            <Box>
        {/* <Typography sx={{ fontWeight: 500 }}>Your experience</Typography> */}
        <Rating size="large" max={10} value={experience_rate} name='simple-controlled' onChange={(event, newValue) => setExperience_rate(newValue)} />
      </Box>
      <br />
      <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
              <FormControl fullWidth>
                
                    <TextField
                      value={body}
                      label='Body'
                      onChange={(e)=>setBody(e.target.value)}
                      placeholder='Describe your experience.'
                      fullWidth
                      multiline
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                      minRows={3}
                      maxRows={3}
                      minLe
                      aria-describedby='registration_date'
                      inputProps={{
                        maxLength: 250,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <MessageOutline />
                          </InputAdornment>
                        )
                      }}
                    />
                 
              </FormControl>
              <small>{body.length} of 250 Characters Used</small>
            </Grid>
      {/* <Box sx={{ mb: 3 }}>
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
      </Box> */}
            </Grid>
            
            <br />

            <Box style={{width:'100%'}} sx={{mt:4}}>
              <Typography style={{marginBottom:'0.5rem', fontWeight:'700'}} variant='h7'>Add an Image</Typography>
              <DropzoneWrapper style={{display:'grid'}}>
      
        
                    <Box
                      style={{width:'100%'}}
                      title='Upload Files with Restrictions'
                      code={{
                        tsx: null,
                        jsx: source.FileUploaderRestrictionsJSXCode
                      }}
                    >
                      <FileUploaderRestrictions
                        files={files}
                        setFiles={setFiles}
                      />
                    </Box>
                    
                    
              </DropzoneWrapper>
            </Box>



            <Grid item xs={12} style={{textAlign:'end', paddingTop:'1em'}}>
              <Button type='button' disabled={submitting} color='secondary' onClick={()=>reset()} variant='contained' size='large'>
                Reset
              </Button>&nbsp;&nbsp;
              <Button type='submit' disabled={submitting} variant='contained' size='large'>
                {
                  submitting && <CircularProgress
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

export default DialogReviewForm
