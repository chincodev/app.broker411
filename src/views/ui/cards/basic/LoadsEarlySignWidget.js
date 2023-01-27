import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import { Box, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { userService } from 'services/user.service'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

const LoadsEarlySignWidget = () => {

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
  
    if(auth.user && auth.user.load_early) return ('')
    return (
        <Box sx={{
            display: { xs: 'block', md: 'block'},
            position: { xs: 'relative', md: 'sticky'},
            top: { xs: 'relative', md: '88px'},
            marginBottom: '1rem'
        }}>
            {/* <CardUser /> */}
            <Card>
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
                        disabled={loading || (auth.user && auth.user.load_early)}
                        onClick={
                            () => getEarlyAccess()
                        } 
                        fullWidth 
                        variant='contained'
                    >
                        {
                            auth.user && auth.user.load_early ? `You're in` : "GET EARLY ACCESS TO LOADS"
                        }
                    </Button>
                </CardContent>
            </Card> 
        </Box>
    )
}

export default LoadsEarlySignWidget


