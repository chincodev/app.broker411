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
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { userService } from 'services/user.service'
import FallbackSpinner from 'src/@core/components/spinner'
import { CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import { clockPickerClasses } from '@mui/lab'

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
  owner: 'success',
  representative: 'primary'
}

const statusColors = {
  true: 'success',
  false: 'warning',
  none: '',
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

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '0.875rem',
  cursor:'pointer'
}))





const UserViewLeft = ({ data, set_data }) => {
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

  const approveReq = async () => {
    if (window.confirm(`Confirm membership of @${data.username} in ${data.request_business.legal_name}?`)) {
      try {
        set_loading(true)
        await userService.confirm_membership(data.id, {request_business_id: null, business_id: data.request_business_id})
        set_data(Object.assign(data, {request_business_id: null, business_id: data.request_business_id}))
        set_loading(false)
      } catch (er) {
        console.log(er)
        alert('Error...')
        set_loading(false)
      }
    }
  }
  const renderUserAvatar = () => {
    if (data) {
      if (data.picture) {
        return (
          <CustomAvatar alt='User Image' src={data.picture} variant='rounded' sx={{ width: 120, height: 120, mb: 4 }} />
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={data.avatarColor}
            sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
          >
            <img style={{width:'100%'}} src={`https://avatars.dicebear.com/api/adventurer-neutral/${Math.floor(Math.random() * (8 - 1 + 1)) + 1}.png`}></img>
          </CustomAvatar>
        )
      }
    } else {
      return null
    }
  }
  if (data) {
    return (
      <Grid container spacing={6}>
        {console.log(data)}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
              <Typography variant='h5' sx={{ mb: 4 }}>
                @{data.username}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.role.name}
                color={typeColors[data.role.name]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            {/* <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      300
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
                      4.3
                    </Typography>
                    <Typography variant='body2'>Rating Avg.</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent> */}

            <CardContent>
              {/* <Typography variant='h6'>Details</Typography> */}
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Phone Number:
                  </Typography>
                  <Typography variant='body2'>{data.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Enabled:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.is_enabled ? 'True' : 'False'}
                    color={statusColors[data.is_enabled]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Verified:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.is_verified ? 'True' : 'False'}
                    color={statusColors[data.is_verified]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Business:
                  </Typography>
                  {console.log(data)}
                  {
                    !isEmpty(data.business) ? (
                      <Link 
                        href={`/admin/businesses/[id]`} 
                        as={`/admin/businesses/${data.business.id}`}
                      >
                        <StyledLink>{data.business.legal_name}</StyledLink>
                      </Link>
                    ) : (
                      <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                        None
                      </Typography>
                    )
                  }
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Membership:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.business_id ? 'Confirmed' : data.request_business_id ? 'Pending' : 'None'}
                    color={statusColors[data.business_id ? 'true' : data.request_business_id ? 'false' : 'none']}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                {
                  data.request_business_id && !data.business_id ? (
                    <><br />
                    <Button fullWidth onClick={()=>approveReq()} disabled={loading} variant='contained'>
                    {/* <Button size='large' onClick={()=>approveReq()} fullWidth variant='outlined' color='primary' > */}
                      {
                      loading ? <>`<CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    /></> : 'APPROVE REQUEST' 
                    }</Button></>
                  ) : ('')
                }
              </Box>
            </CardContent>

            

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
                      <TextField fullWidth label='Full Name' defaultValue={data.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Billing Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
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
                      <TextField fullWidth label='Contact' defaultValue={`+1 ${data.contact}`} />
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
