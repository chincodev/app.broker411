import Grid from '@mui/material/Grid'
import { Avatar, Button, Card, CardContent, CardMedia, Divider, Input, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import { fetchData, fetchNext } from 'src/store/apps/feed'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import ReviewCard from 'src/views/apps/business/view/ReviewCard'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAuth } from 'src/hooks/useAuth'
import NewReviewWidget from 'src/views/ui/cards/basic/NewReviewWidget'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const FeedList = () => {

    const feed = useSelector(state => state.feed)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!feed.data.length > 0) dispatch(fetchData())
    }, [])

    const getNext = () => {
        dispatch(fetchNext())
    }
    

    return (
        <Box >
            {
                !isMobile && <NewReviewWidget />
            }
            {
                feed.loading && feed.data.length === 0 ? (
                    <Box style={{textAlign:'center', marginTop:'2rem'}}>
                        <CircularProgress />
                    </Box>
                ) : (
                    feed.data.length > 0 && <InfiniteScroll
                        style={{width:'100%', }}
                        dataLength={feed.data.length}
                        next={()=>getNext()}
                        hasMore={feed.data.length < feed.total}
                        loader={
                            <Box style={{position:'relative', height:'100px'}}>
                                <Box style={{position:'absolute', top:0, left:0, display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
                                    <CircularProgress size={32} />
                                </Box>
                            </Box>

                        }
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>No more reviews to show right now!</b>
                            </p>
                        }
                    >
                        {
                            feed.data.map(x => <Grid style={{width:'100%', marginTop:'1rem'}} item>
                                <ReviewCard
                                    feedMode={true}
                                    data={x}
                                >
                                    </ReviewCard>
                            </Grid>)
                        }
                    </InfiniteScroll>
                )
            }
        </Box>
    )
}

export default FeedList