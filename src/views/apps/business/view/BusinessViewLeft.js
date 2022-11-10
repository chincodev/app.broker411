// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { businessService } from 'services/business.service'
import { useAuth } from 'src/hooks/useAuth'
import AddBrokerDialog from 'src/layouts/AddBrokerDialog'
import AddReviewDialog from 'src/layouts/AddReviewDialog'
import ShowMoreDialog from 'src/layouts/ShowMoreDialog'

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 400,
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  alignSelf: 'flex-end'
})

const typeColors = {
  carrier: 'success',
  broker: 'primary'
}

const statusColors = {
  true: 'success',
  false: 'warning',
}


const admin_fields = [
  {
    label: 'dba_name',
    values: ['dba_name']
  },{
    label: 'dba_name',
    values: ['dba_name']
  },{
    label: 'dba_name',
    values: ['dba_name']
  },{
    label: 'dba_name',
    values: ['dba_name']
  },{
    label: 'dba_name',
    values: ['dba_name']
  },{
    label: 'dba_name',
    values: ['dba_name']
  },{
    label: 'dba_name',
    values: ['dba_name']
  }
]


const UserViewLeft = ({ business, setBusiness }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const [loading, set_loading] = useState(false)

  const auth = useAuth()

  const handleStatus = async (value) => {
    if (window.confirm(`Do you really want to ${value ? 'disable' : 'enable'} ${business.legal_name}`)) {
      try {
        set_loading(true)
        await businessService.update(business.id, {is_enabled: !value})
        setBusiness(Object.assign(business, {is_enabled: !value}))
        set_loading(false)
      } catch (er) {
        set_loading(false)
      }
    }
  }

  const handlePublish = async (value) => {
    if (window.confirm(`Do you really want to ${value ? 'unpublish' : 'publish'} ${business.legal_name}`)) {
      try {
        set_loading(true)
        await businessService.update(business.id, {is_published: !value})
        setBusiness(Object.assign(business, {is_published: !value}))
        set_loading(false)
      } catch (er) {
        console.log(er)
      }
    }
  }

  const handleVerify = async (value) => {
    if (window.confirm(`The verification will be reset and a verification mail will be sent to the business email address, do you want to continue?`)) {
      try {
        set_loading(true)
        await businessService.resetVerification(business.id, {is_published: !value})
        setBusiness(Object.assign(business, {is_published: !value}))
        set_loading(false)
      } catch (er) {
        console.log(er)
      }
    }
  }

  const renderUserAvatar = () => {
    if (business) {
      if (business.logo) {
        return (
          <CustomAvatar alt='User Image' src={business.logo} variant='rounded' sx={{ width: 120, height: 120, mb: 4 }} />
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={business.avatarColor}
            sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
          >
            {console.log(business)}
            {getInitials(business.legal_name)}
          </CustomAvatar>
        )
      }
    } else {
      return null
    }
  }
  if (business) {
    return (
      <Grid container spacing={6}>
       
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {business.legal_name}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={business.type}
                color={typeColors[business.type]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      {
                        business.reviewCount ? business.reviewCount : 0
                      }
                    </Typography>
                    <Typography variant='body2'>Reviews</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <StarOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                    {
                        business.avgRating ? parseFloat(business.avgRating).toFixed(2) : 0
                      }
                    </Typography>
                    <Typography variant='body2'>Rating Avg.</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Address:</Typography>
                  <Typography variant='body2'>{business.address}{' '}{business.address_line_2}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{business.email || '-'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone Number:</Typography>
                  <Typography variant='body2'>{business.phone || '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7  }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Registration Date:</Typography>
                  <Typography variant='body2'>{business.registration_date || '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7  }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>US Dot Number:</Typography>
                  <Typography variant='body2'>{business.us_dot_number || '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7  }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>MC Number:</Typography>
                  <Typography variant='body2'>{business.mc_mx_ff_numbers || '-'}</Typography>
                </Box>
              </Box>
            </CardContent>

            {
              ['owner', 'representative'].includes(auth.user.role.name) ? (
                <CardActions sx={{ display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
                  <ShowMoreDialog business={business}  />
                  <AddReviewDialog business={business}  />
                  
                </CardActions>
              ) : auth.user.role.name === 'administrator' && (
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button> */}
              {/* <Button color='warning' disabled={loading} onClick={()=>handleVerify()} variant='outlined'>
                Verify
              </Button> */}
              {
                business.is_enabled ? (
                  <Button color='error' disabled={loading} onClick={()=>handleStatus(business.is_enabled)} variant='outlined'>
                    Disable
                  </Button>
                ) : (
                  <Button color='success' disabled={loading} onClick={()=>handleStatus(business.is_enabled)} variant='outlined'>
                    Enable
                  </Button>
                )
              }
              {/* {
                business.is_published ? (
                  <Button color='error' disabled={loading} onClick={()=>handlePublish(business.is_published)} variant='outlined'>
                    UNPUBLISH
                  </Button>
                ) : (
                  <Button color='success' disabled={loading} onClick={()=>handlePublish(business.is_published)} variant='outlined'>
                    PUBLISH
                  </Button>
                )
              } */}
              
              
            </CardActions>
              )
            }

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Name' defaultValue={business.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={business.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Billing Email' defaultValue={business.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={business.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`+1 ${business.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>

        
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
