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
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'

const ReviewCard = ({ data, feedMode = false }) => {
  // ** Vars
  const { title, chipColor, chipText, src, stats, trend, trendNumber } = data

  const top = feedMode ? data.business : data.user.business


  return (
    <Card sx={{ overflow: 'visible', position: 'relative', pb:4 }}>
      <CardContent sx={{ pb: '0 !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb:5 }}>
        <Link href='/brokers/[id]' as={`/brokers/${top.us_dot_number}`}>
        <a style={{textDecoration:'none'}}><CustomAvatar
            skin='light'
            variant='rounded'
            color={top.avatarColor}
            sx={{ width: '2.5rem', height: '2.5rem' }}
          >
            {getInitials(top.legal_name)}
          </CustomAvatar></a>
           </Link>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column', overflow:'hidden' }}>
              <Link href='/brokers/[id]' as={`/brokers/${top.us_dot_number}`}><a style={{textDecoration:'none'}}>
                <Typography noWrap sx={{fontWeight: 600, width:'100%', fontSize:'0.9em' }} style={{overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block"}}>
                  {top.legal_name}
                  </Typography>
                  </a></Link>
              
              <Typography variant='caption'>
              {top.address_line_2} &bull; {moment(data.createdAt).fromNow()}
              </Typography>
             
            </Box>
        </Box>
      
        <Grid container>
          <Grid item xs={12}>
            <div style={{display:'flex', alignItems:'center'}}>
              <Star style={{color:'rgb(223 206 0)', marginBottom:'2px'}} />
              <Typography variant='h7' sx={{ fontSize: '1rem', color: 'primary', marginRight:'.4em' }}>
                &nbsp;{data.rating}/10&nbsp;&nbsp;{feedMode && '|'}
              </Typography>
              {
                feedMode && <><Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled', marginTop:'2px' }}>Review by {data.user.business.legal_name}</Typography>&nbsp;</>
              }
              
              {/* <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}></Typography> */}
            
            </div>
              
            {
              data.body && data.body.length > 0 && <><br /><Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5, pb:0.1, fontSize:'15px' }}>
                {data.body}
              </Typography>
            </Box></>
            }
          </Grid>
          
        </Grid>
        <Box style={{marginTop:'1rem'}}>
      {/* <IconButton aria-label='capture screenshot'>
        <ThumbUp />
      </IconButton> */}

        </Box>
      </CardContent>

      {
        data.categories && data.categories.length > 0 && <>
          <Divider></Divider>
      <CardContent style={{paddingBottom:'0px', paddingTop:'0px'}}>
        <Box style={{display:'flex', alignItems:'center',flexWrap: 'wrap'}}>
          {
            data.categories.map(x => <CustomChip sx={{mr:'5px', mt:'6px'}} label={x.name} size='small' skin='light' color={x.type === 'good' ? 'primary' : 'error'} />)
          }
         </Box>
      </CardContent>
        </>
      }
      
    </Card>
  )
}

export default ReviewCard