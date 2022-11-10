// ** React Imports
import { useEffect, useState } from 'react'

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
import UserViewSecurity from 'src/views/apps/user/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/view/UserViewNotification'
import { BowlMixOutline, StarOutline, ZipBoxOutline } from 'mdi-material-ui'
import Grid from '@mui/material/Grid'
import ReviewCard from './ReviewCard'
import { reviewService } from 'services/review.service'
import queryString from 'query-string'
import { CircularProgress, MenuItem, Pagination, Select, Typography } from '@mui/material'
import PaginationSimple from 'src/views/components/pagination/PaginationSimple'
import usePaginationController from '../../../../../utils/usePaginationController'
import urlManager from '../../../../../utils/urlManager'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/review'
import { useDispatch } from 'react-redux'

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 300,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 300
  }
}))


const LoadsTab = (props) => {
  const BoxWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '90vw'
    }
  }))


    return (
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <BoxWrapper>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
            This feature is coming soon 🚀
          </Typography>
          {/* <Typography variant='body2'>
            Keep an eye in our social network accounts to ads asdasd
          </Typography> */}
        </Box>
        
      </BoxWrapper>
      <Img alt='coming-soon-illustration' src='/images/pages/misc-coming-soon.png' />
    </Box>
        
    )
}


export default LoadsTab