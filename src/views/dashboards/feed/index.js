import Grid from '@mui/material/Grid'
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import FeedList from './list'
import { Box, Card } from '@mui/material'

const Feed = () => {


  return (
    <Box className='content-center'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={0} lg={2} order={{ md: 1, xs: 1 }}>
          
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={3} order={{ md: 3, xs: 2 }}>
          <CardUser />
          <Card sx={{mt:4}}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <h2 style={{marginTop:0}}>Atention!</h2>
              <Typography sx={{textAlign:'center', color:"#00adb5"}}>
                Carriers can win a $100 Amazon Gift Card or the equivalent in Crypto or Paypal! Each review you leave counts as one entry. A winner will be selected on Thanksgiving day at 4:00 PM PST.
                    </Typography>
              </Box>
              </CardContent>
          </Card>
          
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