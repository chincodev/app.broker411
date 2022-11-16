// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'

const UserView = ({ id, data, code }) => {

  const [ business_data, set_business_data ] = useState(data)

  useEffect(() => {
    set_business_data(data)
  }, [data])
  

  if(code === 404){
    return (
      <Card>
      {/* <CardHeader sx={{ textAlign: 'center', fontWeight:'900' }} title='Oooops...' titleTypographyProps={{ variant: 'h6' }} /> */}
      <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant='h2' sx={{ mb: 2.5 }}>
            404
          </Typography>
          <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
            Page Not Found ⚠️
          </Typography>
          <Typography variant='body2'>We couldn&prime;t find a business with DOT Number <strong>{window.location.pathname.replace('/brokers/', '').replace('/', '')}</strong></Typography>
          <br />
        <img height='256px' alt='error-illustration' src='/images/pages/misc-under-maintenance.png' />
        <br /><br />
        <Typography variant='h6' color={'info'} sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.2rem !important' }}>
            Verify the DOT Number and try again or request technical support
          </Typography>
          <Link href='/'><Button>Go back to Home</Button></Link>
      </CardContent>
    </Card>
      // <Grid container spacing={6}>
        
      //   <Grid item xs={12}>
      //     <Alert severity='error'>
      //       User with the id: {id} does not exist. Please check the list of users:{' '}
      //       <Link href='/admin/businesses'>User List</Link>
      //     </Alert>
      //   </Grid>
      // </Grid>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={business_data} set_data={set_business_data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
         
        </Grid>
      </Grid>
    )
  }
}

export default UserView
