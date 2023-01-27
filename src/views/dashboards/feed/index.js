import Grid from '@mui/material/Grid'
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import FeedList from './list'
import { Box, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { userService } from 'services/user.service'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import LoadsEarlySignWidget from 'src/views/ui/cards/basic/LoadsEarlySignWidget'
import NewReviewWidget from 'src/views/ui/cards/basic/NewReviewWidget'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import TopBrokersWidget from 'src/views/ui/cards/basic/TopBrokersWidget'

const Feed = () => {

    const [ loading, setLoading ] = useState(false)

    const auth = useAuth()

    const getEarlyAccess =  async () => {

        try {
            setLoading(true)
            await userService.update_me({load_early:true})
            toast.success('Loads early access request sent.')
            setLoading(false)
        } catch (er) {
            if(er.code === 404){
                toast.error('You already joined.')
            } else {
                toast.error('Something went wrong.')
            }
            setLoading(false)
        }
    
    }
  

    return (
        <Box className='content-center'>
            <Grid container spacing={6}>
                {
                    isMobile ? <Grid item xs={12} md={0} lg={2} order={{ md: 1, xs: 1 }}>
                        <NewReviewWidget />
                    </Grid> : (
                        <Grid item xs={12} md={0} lg={0} order={{ md: 1, xs: 1 }}>
                        </Grid> 
                    )
                }
                <Grid item xs={12} sm={12} md={5} lg={5} order={{ md: 3, xs: 2 }}>
                    <LoadsEarlySignWidget />
                    <TopBrokersWidget />
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={7} order={{ md: 2, xs: 3 }}>
                    <FeedList />
                </Grid>
                <Grid item xs={12} md={0} lg={0} order={{ md: 4, xs: 4 }}>
                    {/* <TopBrokersWidget /> */}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Feed