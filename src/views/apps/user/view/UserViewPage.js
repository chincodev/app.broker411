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

const UserView = ({ id, data, code }) => {

  const [ business_data, set_business_data ] = useState(data)

  if(code === 404){
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {id} does not exist. Please check the list of users:{' '}
            <Link href='/admin/businesses'>User List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={business_data} set_data={set_business_data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight data={business_data} set_business_data={set_business_data} />
        </Grid>
      </Grid>
    )
  }
}

export default UserView
