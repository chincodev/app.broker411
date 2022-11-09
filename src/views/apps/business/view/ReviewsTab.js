// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import LockOutline from 'mdi-material-ui/LockOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import LinkVariant from 'mdi-material-ui/LinkVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'
// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/view/UserViewBilling'
import UserViewOverview from 'src/views/apps/user/view/UserViewOverview'
import UserViewSecurity from 'src/views/apps/user/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/view/UserViewNotification'
import { BowlMixOutline, StarOutline, ZipBoxOutline } from 'mdi-material-ui'
import Grid from '@mui/material/Grid'
import ReviewCard from './ReviewCard'
import { reviewService } from 'services/review.service'
import queryString from 'query-string'
import { CircularProgress, Pagination } from '@mui/material'
import PaginationSimple from 'src/views/components/pagination/PaginationSimple'

const ReviewsTab = (props) => {

	const { business, setBusiness } = props

    const [ data, setData ] = useState({})
	
	const [ loading, setLoading ] = useState({})

	const requiredFilter = {
		filter_type: ['eq'],
		filter_field: ['business_id'],
		filter_value: [business.id]
	}

	const getData = async () => {
		try {
			setLoading(true)
			const response = await reviewService.list(`?${queryString.stringify(requiredFilter, {arrayFormat:'bracket'})}`)
			setData(response)
			setLoading(false)
		} catch (er) {
			console.log(er)
		}
	}

    useEffect(() => {
		getData()
    }, [])

	const page = 1

	const handleChange = () => {

	}

    return (
		<Box>
			{
				loading ? (
					<Box style={{width:'100%', textAlign:'center'}}>
						<CircularProgress disableShrink sx={{ mt: 6 }} />
					</Box>
				) : (
					<Box>
					<Grid container spacing={6} className='match-height'>
						
						{
							data.data && data.data.map(x => <Grid item xs={12} md={6} lg={6}>
								<ReviewCard
								  data={{
									...x,
									stats: '8.14k',
									title: 'Ratings',
									chipColor: 'primary',
									trendNumber: '+15.6%',
									chipText: 'Year of 2022',
									src: '/images/cards/card-stats-img-1.png'
								  }}
								/>
							</Grid>)
						}
						
          			</Grid>
					  <Box sx={{mt:4}}>
							<Pagination 
								onChange={handleChange}
								count={10}
								page={page}
								size={'large'}
							/>
						</Box>
					</Box>
				)
			}
		</Box>
        
    )
}


export default ReviewsTab