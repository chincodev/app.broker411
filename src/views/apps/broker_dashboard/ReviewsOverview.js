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
import { useEffect, useState } from 'react'
import { reviewService } from 'services/review.service'
import { businessService } from 'services/business.service'
import { useAuth } from 'src/hooks/useAuth'
import { replyService } from 'services/reply.service'
import { CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'

const _salesData = [
  {
    stats: '0',
    color: 'primary',
    title: 'Reviews',
    icon: <MessageOutline />
  },
  {
    color: 'info',
    stats: '0',
    icon: <ReplyAllOutline />,
    title: 'Replies'
  },
  {
    icon: <StarOutline />,
    stats: '0',
    color: 'warning',
    title: 'Rating'
  }
]

const renderStats = (salesData) => {

  return salesData.map((sale, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
          {sale.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {sale.stats}
          </Typography>
          <Typography variant='caption'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const ReviewsOverview = () => {

	const auth = useAuth()

	const getData = async () => {
		try {
			setLoading(true)
			const _business_info = await businessService.find_broker_in_fmcsa(auth.user.business.us_dot_number)
	
			setSalesData([
				{
				  stats: _business_info.record.reviewCount,
				  color: 'primary',
				  title: 'Reviews',
				  icon: <MessageOutline />
				},
				{
				  color: 'info',
				  stats: '0',
				  icon: <ReplyAllOutline />,
				  title: 'Replies'
				},
				{
				  icon: <StarOutline />,
				  stats: _business_info.record.avgRating ? _business_info.record.avgRating : 0,
				  color: 'warning',
				  title: 'Rating'
				}
			])
			setLoading(false)
		} catch (er) {
			console.log(er)
		}
	}
	const [ loading, setLoading ] = useState(true)
  	const [ salesData, setSalesData ] = useState(_salesData)
	  

  	useEffect(() => {
  	  	getData()
  	}, [])

  return (
    <Card sx={{position: 'relative',}}>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Reviews Overview'
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats(salesData)}
        </Grid>
      </CardContent>
	  	{
			loading && <Box sx={{
				position: 'absolute',
				backgroundColor:'rgba(0,0,0,0.35)',
				top:0,
				left:0,
				width: '100%',
				height: '100%',
			}}>
				  <CircularProgress
					size={24}
					sx={{
						  color: green[500],
						  position: 'absolute',
						  top: '50%',
						  left: '50%',
						  marginTop: '-12px',
						  marginLeft: '-12px',
					}}
				/>
			</Box> 
		}     
    </Card>
  )
}

export default ReviewsOverview
