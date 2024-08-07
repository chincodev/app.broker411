import { Typography } from '@mui/material'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useAuth } from 'src/hooks/useAuth'
import ReviewsList from 'src/views/apps/review/list'
import AccountSettings from 'src/views/pages/account-settings/AccountSettings';

const Reviews = (props) => {

    const auth = useAuth()

    return <>
        <Breadcrumbs aria-label="breadcrumb" sx={{mb:5}}>
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
        {/* <AccountSettings 
            tab = 'settings'
        /> */}
        <AccountSettings
            tab={'reviews'}
            {...props}
        />
    </>
}


export default Reviews
