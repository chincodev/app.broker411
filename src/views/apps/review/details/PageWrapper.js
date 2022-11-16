import { Card } from '@mui/material'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Link from 'next/link';
import React from 'react'
import ReviewDetails from './Details'

const ReviewPageWrapper = (props) => {
    {console.log(props)}
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
                <ReviewDetails {...props} page={true} />
            </Card>
        </>
    )
}

export default ReviewPageWrapper