import { Typography } from '@mui/material'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useAuth } from 'src/hooks/useAuth'
import ReviewsList from 'src/views/apps/review/list'

const Reviews = ({ id, data, code }) => {

    const auth = useAuth()

    return <>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                <a style={{textDecoration:'none'}}>
                    <Typography color="secondary">Home</Typography>
                </a>
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="/account"
          
            >
                <a style={{textDecoration:'none'}}>
                    <Typography color="secondary">Account</Typography>
                </a>
            </Link>
            <Typography color="text.primary">My Reviews</Typography>
        </Breadcrumbs>
        <ReviewsList 
            id={id} 
            data={data} 
            code={code} 
            requiredFilter={'?filter_field[]=user_id&filter_type[]=eq&filter_value[]='+auth.user.id+'&'} 
        />
    </>
}


export default Reviews
