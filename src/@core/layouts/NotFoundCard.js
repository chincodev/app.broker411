import { Button, Card, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
const PageNotFoundCard = (props) => {
    
    const { context } = props

    const router = useRouter()

    console.log(router);

    return (
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant='h2' sx={{ mb: 2.5 }}>
                404
              </Typography>
              <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
                Page Not Found ⚠️
              </Typography>
              <Typography variant='body2'>We couldn&prime;t find any {context}.</Typography>
              <br />
            <img height='256px' alt='error-illustration' src='/images/pages/misc-under-maintenance.png' />
            <br /><br />
                {/* <Button onClick={()=>router.back()} variant='contained' color='secondary'>Go back</Button> &nbsp; */}
              <Link href='/'><Button variant='contained'>Go to Home</Button></Link>
          </CardContent>
        </Card>
    )
}

export default PageNotFoundCard