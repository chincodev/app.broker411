import { Button, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from 'next/link';
import React from 'react'
import ReviewDetails from './Details'

const ReviewPageWrapper = (props) => {
    
    if(props.code === 404){
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
              <Typography variant='body2'>We couldn&prime;t find any reviews.</Typography>
              <br />
            <img height='256px' alt='error-illustration' src='/images/pages/misc-under-maintenance.png' />
            <br /><br />
              <Link href='/'><Button variant='contained'>Go back to Home</Button></Link>
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
        <>
            <Box sx={{mb:4}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        <a style={{textDecoration:'none'}}>
                            <Typography color="secondary">Home</Typography>
                        </a>
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/brokers"
                  
                    >
                        <a style={{textDecoration:'none'}}>
                            <Typography color="secondary">Brokers</Typography>
                        </a>
                    </Link>
                    <Link
                        style={{textTransform:'capitalize'}}
                        underline="hover"
                        color="inherit"
                        href="/brokers/[id]"
                        as={`/brokers/${props.data.business.us_dot_number}`}
                    >
                        <a style={{textDecoration:'none'}}>
                            <Typography color="secondary" style={{textTransform:'capitalize'}}>
                                {props.data.business.legal_name.toLowerCase()}
                            </Typography>
                        </a>
                    </Link>
                    {/* <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        <a style={{textDecoration:'none'}}>
                            <Typography color="secondary">{'Reviews'}</Typography>
                        </a>
                    </Link> */}
                    
                    <Typography color="text.primary">Review#{props.id}</Typography>
                </Breadcrumbs>
            </Box>
            <Card>
                <ReviewDetails {...props} page={true} top={props.data.business}/>
            </Card>
        </>
    )
                }
}

export default ReviewPageWrapper