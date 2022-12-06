import Grid from '@mui/material/Grid'
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import FeedList from './list'
import { Box, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { userService } from 'services/user.service'
import toast from 'react-hot-toast'

const Feed = () => {

    const [ loading, setLoading ] = useState(false)

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
                <Grid item xs={12} md={0} lg={2} order={{ md: 1, xs: 1 }}>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={3} order={{ md: 3, xs: 2 }}>
                    <Box sx={{
                        display: { xs: 'block', md: 'block'},
                        position: { xs: 'relative', md: 'sticky'},
                        top: { xs: 'relative', md: '88px'}
                    }}>
                        <CardUser />
                        <Card sx={{mt:4}}>
                            <CardContent>
                                <Box>
                                    <Typography sx={{textAlign:'center'}} variant='h6'>
                                        Loads for Box Trucks, Sprinters, & More
                                    </Typography>
                                    <Typography sx={{textAlign:'center', color:"#00adb5", mt:3, mb:4}}>
                                        Sign up now for free & early access to the Broker411 load board.
                                    </Typography>
                                </Box>
                                <Button 
                                    disabled={loading || auth.user.load_early}
                                    onClick={
                                        () => getEarlyAccess()
                                    } 
                                    fullWidth 
                                    variant='contained'
                                >
                                    {
					                	auth.user.load_early ? `You're in` : "GET EARLY ACCESS TO LOADS"
					                }
                                </Button>
                            </CardContent>
                        </Card> 
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={5} order={{ md: 2, xs: 3 }}>
                    <FeedList />
                </Grid>
                <Grid item xs={12} md={0} lg={2} order={{ md: 4, xs: 4 }}>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Feed