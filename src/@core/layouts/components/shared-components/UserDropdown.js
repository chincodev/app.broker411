// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import { useAuth } from 'src/hooks/useAuth'
import { KeyOutline, MailboxOutline, OfficeBuilding, OfficeBuildingCog, StarBoxOutline, StarOffOutline } from 'mdi-material-ui'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import ChangePasswordDialog from 'src/views/apps/profile/ChangePasswordDialog'
import ChangeEmailDialog from 'src/views/apps/profile/ChangeEmailDialog'
import BusinessInfoDialog from 'src/views/apps/business/BusinessInfoDialog'
// ** Context

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()
  const auth = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    auth.logout()
    handleDropdownClose()
  }

  const [ openPasswordDialog, setOpenPasswordDialog ] = useState(false)
  const [ openEmailDialog, setOpenEmailDialog ] = useState(false)
  const [ businessInfoDialog, setBusinessInfoDialog ] = useState(false)
  const [ password, setPassword ] = useState('')

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={auth.user.username}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={'https://avatars.dicebear.com/api/bottts/'+auth.user.id+'.png'}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src={'https://avatars.dicebear.com/api/bottts/'+auth.user.id+'.png'} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{auth.user.username}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {auth.user.role.name.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        {
          auth && auth.user && auth.user.business && auth.user.business.us_dot_number && auth.user.business.us_dot_number > 0 && (
            <MenuItem sx={{ p: 0 }} onClick={() => {
                setAnchorEl(null)
                setBusinessInfoDialog(true)

                }}>
              <Box sx={styles}>
                <OfficeBuildingCog sx={{ mr: 2 }} />
                My business
              </Box>
            </MenuItem>
          )
        }
        
        <MenuItem sx={{ p: 0 }} onClick={() => {
            setAnchorEl(null)
            router.push('/account/reviews')
          }}>
          <Box sx={styles}>
            <StarBoxOutline sx={{ mr: 2 }} />
            My reviews
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => {
            setAnchorEl(null)
            setOpenPasswordDialog(true)
            }}>
          <Box sx={styles}>
            <KeyOutline sx={{ mr: 2 }} />
            Change password
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => {
            setAnchorEl(null)
            setOpenEmailDialog(true)
            
            }}>
          <Box sx={styles}>
            <MailboxOutline sx={{ mr: 2 }} />
            Change email
          </Box>
        </MenuItem>
        
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
      <ChangePasswordDialog 
        setOpenPasswordDialog={setOpenPasswordDialog}
        openPasswordDialog={openPasswordDialog}
      />
      <ChangeEmailDialog 
        setOpenDialog={setOpenEmailDialog}
        openDialog={openEmailDialog}
      />

      <BusinessInfoDialog 
      handleClose={()=>setBusinessInfoDialog(false)}
               setOpenDialog={setBusinessInfoDialog}
               openDialog={businessInfoDialog}
      />
    </Fragment>
  )
}

export default UserDropdown
