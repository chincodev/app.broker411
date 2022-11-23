import { Typography } from '@mui/material'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AccountSettings from 'src/views/pages/account-settings/AccountSettings';


const UserSettings = () => {

    return <>
        <Breadcrumbs aria-label="breadcrumb" sx={{mb:5}}>
            <Link underline="hover" color="inherit" href="/">
                <a style={{textDecoration:'none'}}>
                    <Typography color="secondary">Home</Typography>
                </a>
            </Link>
            <Typography color="text.primary">Account</Typography>
        </Breadcrumbs>
        <AccountSettings />
    </>
}


export default UserSettings
