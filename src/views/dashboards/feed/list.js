import Grid from '@mui/material/Grid'
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import { fetchData } from 'src/store/apps/feed'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import ReviewCard from 'src/views/apps/business/view/ReviewCard'
import { useEffect } from 'react'

const FeedList = () => {

    const feed = useSelector(state => state.feed)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!feed.data.length > 0){
            
            dispatch(fetchData(''))
        }
    }, [])
    

    return (
        <Box sx={{ml:6, mr:6}}>
            <Typography variant='h6'>Reviews By Carriers</Typography>
            {console.log(feed)}
            <Divider />
            {
                feed.loading ? (
                    <Box style={{textAlign:'center', marginTop:'2rem'}}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid style={{marginTop:'-.5rem'}} spacing={6} container>
                        {
                            feed.data.length > 0 ? (
                                feed.data.map(x => <Grid style={{width:'100%'}} item>
                                    <ReviewCard
                                        feedMode={true}
                                        data={x}
                                    >
                                        </ReviewCard>
                                </Grid>)
                            ) : (
                                <h2>No data</h2>
                            )
                        }
                    </Grid>
                )
            }
        </Box>
    )
}

export default FeedList