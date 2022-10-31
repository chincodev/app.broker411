import Box from '@mui/material/Box'
import Link from 'next/link'

const CrmDashboard = () => {

    

    return (
        <Box className='content-center'>
            <Link href='/admin/businesses'>List of businesses</Link>
        </Box>
    )
}

export default CrmDashboard