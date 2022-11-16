// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import ReviewCard from './ReviewCard'
import queryString from 'query-string'
import { Button, CircularProgress, MenuItem, Pagination, Select, Typography } from '@mui/material'
import urlManager from '../../../../../utils/urlManager'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/review'
import { useDispatch } from 'react-redux'
import AddReviewDialog from 'src/layouts/AddReviewDialog'

const Img = styled('img')(({ theme }) => ({
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(15),
	[theme.breakpoints.down('lg')]: {
		height: 225,
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	[theme.breakpoints.down('md')]: {
		height: 200
	}
}))

const ReviewsTab = (props) => {

	const store = useSelector(state => state.review)

	const { business, setBusiness } = props

    const [sortOptions, setSortOptions] = useState([
		{
			label:'Date',
			sort_field:'create_at',
			sort_order:'desc',
			value:'created_at|desc',
			default: true,
		},{
			label:'Rating',
			sort_field:'rating',
			sort_order:'desc',
			value:'rating|desc'
		}
	])

	const getData = (url_params) => {
		dispatch(fetchData(`?${url_params ? url_params+'&' : ''}${queryString.stringify(requiredFilter, {arrayFormat:'bracket'})}`))
	}

	const requiredFilter = {
		filter_type: ['eq'],
		filter_field: ['business_id'],
		filter_value: [business.id]
	}

	const dispatch = useDispatch()

    useEffect(() => {
		getData(window.location.search ? window.location.search.replace('?', '') : null)
    }, [business])

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			shallow && getData(url.split('?')[1] ? url.split('?')[1] : null)
		}

		router.events.on('routeChangeStart', handleRouteChange)

		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [])

	const page = 1

	const router = useRouter()

    return (
		<Box>
			{console.log(store)}
			{
				store.loading ? (
					<Box style={{width:'100%', textAlign:'center'}}>
						<CircularProgress disableShrink sx={{ mt: 6 }} />
					</Box>
				) : (!store.data.length > 0) ? (
					<Box style={{display:'flex', alignItems:'center', marginTop:'2rem', flexDirection:'column'}}>
						<Typography variant='h5' style={{fontWeight:'700'}}>No data found right now</Typography>
						<Img alt='error-illustration' src='/images/pages/kb-api.png' />
						<Box>
							<AddReviewDialog business={business} btnText={'Leave the first review!'}  />
						</Box>
					</Box>
				) : (
					<Box>
						<Box style={{
							display:'flex', 
							justifyContent:'space-between', 
							alignItems:'center',
							marginTop:'1em',
							marginBottom:'1em'
						}}>
							<Typography>
								{`Showing ${store.starting_at} to ${(store.starting_at - 1) + store.data.length} of ${store.total}`}
							</Typography>
							<Box>
								<Select
        							value={
										(new URLSearchParams(window.location.search).get('sort_field') && new URLSearchParams(window.location.search).get('sort_order')) 
											? sortOptions.find(x => x.sort_field === new URLSearchParams(window.location.search).get('sort_field') && x.sort_order === new URLSearchParams(window.location.search).get('sort_order'))?.['value']||sortOptions.find(x => x.default)['value'] 
											: sortOptions.find(x => x.active)?.['value']||sortOptions.find(x => x.default)['value']
										
									}
        							label='Controlled'
									variant='standard'
        							id='controlled-select'
        							onChange={(e, props)=>{
										urlManager({
											router,
											href: '/brokers/[id]',
											as: '/brokers/'+business.us_dot_number, 
											params:[
												{
													key: 'sort_field',
													value: props.props.value.split('|')[0],
													type: 'replace'
												},{
													key: 'sort_order',
													value: props.props.value.split('|')[1],
													type: 'replace'
												},{
													key: 'page_number',
													value: 1,
													type: 'replace'
												}
											]
										})
									}}
        							labelId='controlled-select-label'
        						>
									{
										sortOptions.map( x => <MenuItem value={x.value}>{x.label}</MenuItem>)
									}
        						</Select>
							</Box>
						</Box>
						<Grid container spacing={6} className='match-height'>
							{
								store.data && store.data.map(x => <Grid item xs={12} md={6} lg={6}>
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
								onChange={(e, number)=>urlManager({
									router,
									href: '/brokers/[id]',
									as: '/brokers/'+business.us_dot_number,
									params:[
										{
										  key: 'page_number',
										  value: number,
										  type: 'replace'
										}
									]
								})}
								count={store.total && store.page_size ? Math.ceil(store.total / store.page_size) : 0}
								page={store.current_page}
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