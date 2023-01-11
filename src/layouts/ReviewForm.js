import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'mdi-material-ui/React'
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import { Button, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, InputAdornment, Rating, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { AccountOutline, DeleteOutline, Email, EmailOutline, FaceAgent, LocationEnter, Map, Marker, MessageOutline, OfficeBuildingOutline, Phone, Pin, ThumbDown, ThumbUp } from 'mdi-material-ui'
import * as yup from "yup";
import { green } from '@mui/material/colors'
import useBgColor from 'src/@core/hooks/useBgColor'
import { fetchData } from 'src/store/apps/field'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { reviewService } from 'services/review.service'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'


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


const ReviewForm = (props) => {

  const { business, allowResetBusiness, setBusiness } = props

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

  const submitData = async (e) => {
    try {
      e.preventDefault()
      setSubmitting(true)
      await reviewService.create({
        rating: experience_rate,
        type,
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
              <ToggleButtonGroup size='small' exclusive color={type === 'good' ? 'success' : 'error'} value={type} onChange={(e)=>{
                setCategories([])
                setType(e.target.value)
              }}>
                
                <ToggleButton value='good'>Good</ToggleButton>
                <ToggleButton value='bad'>Bad</ToggleButton>
              </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} style={{marginBottom:'0.5rem'}}>
             
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
                      minRows={2}
                      maxRows={2}
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
            </Grid>
            <Grid>
              
              

            





            </Grid>
            <Box sx={{pt:0,display:'flex', flexDirection:{xs:'column-reverse', md:'row'}, width:'100%', justifyContent:'flex-end', paddingTop:'1em'}}>
              <Button sx={{mt:{xs:1, md:0}, mr:{xs:0, md:1}}} type='button' disabled={submitting} color='secondary'  onClick={()=>{
                reset()
                setBusiness(null)
              }} variant='contained'>
                Search another Brokerage
              </Button>
              <Button type='submit' disabled={submitting} variant='contained'  >
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
            </Box> 
          </Grid>
        </form>
      </Box>
  )
}

export default ReviewForm
