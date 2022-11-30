// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import LockOutline from 'mdi-material-ui/LockOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import LinkVariant from 'mdi-material-ui/LinkVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'
// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/view/UserViewBilling'
import UserViewOverview from 'src/views/apps/user/view/UserViewOverview'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/view/UserViewNotification'
import { BowlMixOutline, StarOutline, ZipBoxOutline } from 'mdi-material-ui'
import Grid from '@mui/material/Grid'
import ReviewCard from './ReviewCard'
import ReviewsTab from './ReviewsTab'
import LoadsTab from './LoadsTab'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = ({ business, setBusiness }) => {
  // ** State
  const [value, setValue] = useState('reviews')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  if(!business){
    return ''
  }

  return (
    <TabContext value={value}>
  
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='reviews' label='Reviews' icon={<StarOutline sx={{ fontSize: '18px' }} />} />
        <Tab value='loads' label='Loads' icon={<ZipBoxOutline sx={{ fontSize: '18px' }} />} />
        {/* <Tab value='billing-plan' label='Billing & Plan' icon={<BookmarkOutline sx={{ fontSize: '18px' }} />} /> */}
        {/* <Tab value='notification' label='Notification' icon={<BellOutline sx={{ fontSize: '18px' }} />} />
        <Tab value='connection' label='Connection' icon={<LinkVariant sx={{ fontSize: '18px' }} />} /> */}
      </TabList>
      <Box sx={{ mt: 3 }}>
        <TabPanel sx={{ p: 0 }} value='reviews'>
          <ReviewsTab 
            business={business}
            setBusiness={setBusiness}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='loads'>
          <LoadsTab />
        </TabPanel>
      </Box>

    </TabContext>
  )
}

export default UserViewRight
