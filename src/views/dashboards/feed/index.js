import Grid from '@mui/material/Grid'
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import FeedList from './list'

const Feed = () => {


  return (
    <Box className='content-center'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <CardUser />
        </Grid>
        <Grid item xs={12} md={6}>
          <FeedList />
        </Grid>
        {/* <Grid item xs={12} md={3}>
          asdasdasdasdasdasdasdasdasdasdasdasd
        </Grid> */}
      </Grid>
    </Box>
  )
}

export default Feed