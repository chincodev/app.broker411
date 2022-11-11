import Grid from '@mui/material/Grid'
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import FeedList from './list'

const Feed = () => {


  return (
    <Box className='content-center'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={0} lg={2} order={{ md: 1, xs: 1 }}>
          
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={3} order={{ md: 3, xs: 2 }}>
          <CardUser />
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