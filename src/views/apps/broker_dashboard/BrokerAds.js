// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { MessageOutline, ReplyAllOutline, StarOutline } from 'mdi-material-ui'
import { Button } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from 'services/user.service'
import { useAuth } from 'src/hooks/useAuth'





const BrokerAds = () => {

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
  	  	<Card>
  	  	  	<CardHeader
  	  	  	  	sx={{ pb: 3.25 }}
  	  	  	  	title='Post Loads For Box Trucks, Sprinters, & More'
  	  	  	  	titleTypographyProps={{ variant: 'h6' }}
  	  	  	/>
  	  	  	<CardContent>
  	  	  	  	<Box sx={{mb:4}}>
  	  	  	  	  	<Typography sx={{color:"#00adb5"}}>Sign up now for free & early access to posting loads on Broker411.</Typography>
  	  	  	  	</Box>
  	  	  	  	<Button 
					variant='contained'
					onClick={()=>getEarlyAccess()}
					disabled={loading || auth.user.load_early}
				>
					{
						auth.user.load_early ? `You're in` : "GET EARLY ACCESS TO LOADS"
					}
				</Button>
  	  	  	</CardContent>
  	  	</Card>
  	)
}

export default BrokerAds
