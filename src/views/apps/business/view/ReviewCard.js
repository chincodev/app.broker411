// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { Avatar, Badge, Divider, IconButton } from '@mui/material'
import { Star, ThumbUp } from 'mdi-material-ui'

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  '1s',
    ss: '%ss',
    m:  '1m',
    mm: '%dm',
    h:  '1h',
    hh: '%dh',
    d:  '1d',
    dd: '%dd',
    M:  '1M',
    MM: '%dM',
    y:  '1Y',
    yy: '%dY'
  }
})

const ReviewCard = ({ data }) => {
  // ** Vars
  const { title, chipColor, chipText, src, stats, trend, trendNumber } = data

  return (
    <Card sx={{ overflow: 'visible', position: 'relative', pb:4 }}>
      <CardContent sx={{ pb: '0 !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb:5 }}>
           
              <Avatar alt='John Doe' src={'https://avatars.dicebear.com/api/identicon/'+data.user.business_id+'.png'} sx={{ width: '2.5rem', height: '2.5rem' }} />
         
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column', overflow:'hidden' }}>
              <Typography noWrap sx={{ fontWeight: 600, width:'100%', fontSize:'0.9em' }} style={{overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block"}}>{data.user.business.legal_name}</Typography>
              {/* <Typography variant='body2' sx={{ fontSize: '0.7rem', color: 'text.disabled' }}>
                {data.user.business.address_line_2}
              </Typography> */}
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
              {data.user.business.address_line_2} &bull; {moment(data.createdAt).fromNow()}
              </Typography>
             
            </Box>
        </Box>
      
        <Grid container>
          <Grid item xs={12}>
            <div style={{display:'flex', alignItems:'center'}}>
              <Star style={{color:'#fdff62'}} />
              <Typography variant='h7' sx={{ fontSize: '1rem', color: 'primary', marginTop:'5px' }}>
                &nbsp;&nbsp;{data.rating}
              </Typography>
              
            </div>
           
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5, pb:0.1 }}>
                {data.body}
              </Typography>
            </Box>
          </Grid>
          
        </Grid>
        <Box style={{marginTop:'1rem'}}>
      {/* <IconButton aria-label='capture screenshot'>
        <ThumbUp />
      </IconButton> */}

        </Box>
      </CardContent>
    
    </Card>
  )
}

export default ReviewCard