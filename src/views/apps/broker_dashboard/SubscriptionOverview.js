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
import CustomChip from 'src/@core/components/mui/chip'
// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { MessageOutline, ReplyAllOutline, StarOutline } from 'mdi-material-ui'
import { Button, LinearProgress } from '@mui/material'
import { styled } from '@mui/system'


const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const salesData = [
  {
    stats: '8,458',
    color: 'primary',
    title: 'Reviews',
    icon: <MessageOutline />
  },
  {
    color: 'info',
    stats: '2,450',
    icon: <ReplyAllOutline />,
    title: 'Replies'
  },
  {
    icon: <StarOutline />,
    stats: '9.4',
    color: 'warning',
    title: 'Rating'
  }
]

const renderStats = () => {
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

const AvatarImg = styled('img')(({ theme }) => ({

  textAlign:'center',
  height: 162,

  [theme.breakpoints.down('md')]: {
    height: 154
  },
  [theme.breakpoints.down('sm')]: {
    height: 149
  }
}))

const SubscriptionOverview = () => {



  return (
    <Card style={{display:'flex', flexDirection:'column'}}>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Subscription Overview'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <CustomChip
                skin='light'
                size='small'
                color='error'
                label='Not Found'
                sx={{ fontSize: '0.75rem', borderRadius: '4px' }}
              />
        }
        // subheader={
        //   <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //     <Typography variant='caption' sx={{ mr: 1.5 }}>
        //       Brokerage Stats
        //     </Typography>
        //     {/* <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
        //       +18%
        //     </Typography> */}
        //     {/* <ChevronUp fontSize='small' sx={{ color: 'success.main' }} /> */}
        //   </Box>
        // }
      />
      <Box style={{display:'flex', flexDirection:'column', justifyContent:'space-between', flexGrow:'1'}}>
        <div></div>
      <CardContent>
      <Box sx={{ mt: 0, mb: 0 }}>
                
      <Box style={{textAlign:'center'}}>
      <AvatarImg alt='Upgrade Account' src='/images/cards/illustration-upgrade-account.png' />

      </Box>
        <Typography variant='h5' style={{ textAlign:'center'}}>Upgrade Account Now</Typography>
        <Typography sx={{ mb: 1, textAlign:'center' }} variant='body2'>
          Get access to awesome features
        </Typography>
        <Typography variant='h5' sx={{ fontWeight: 600, color: 'primary.main', mt:2, mb:4, textAlign:'center' }}>
          $9,99
        </Typography>

        <Button size='small' onClick={()=>alert('Feature comming soon')} fullWidth variant='contained'>
          Subscribe
        </Button>
       
      
              </Box>
             
          
             
      </CardContent>
      </Box>
    </Card>
  )
}

export default SubscriptionOverview



// <Card style={{display:'flex', flexDirection:'column'}}>
// <CardHeader
//   sx={{ pb: 3.25 }}
//   title='Subscription Overview'
//   titleTypographyProps={{ variant: 'h6' }}
//   action={
//     <CustomChip
//           skin='light'
//           size='small'
//           color='primary'
//           label='Standard'
//           sx={{ fontSize: '0.75rem', borderRadius: '4px' }}
//         />
//   }
// />
// <Box style={{display:'flex', flexDirection:'column', justifyContent:'space-between', flexGrow:'1'}}>
// <CardContent
//         sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', }}
//       >
        
//         <Box sx={{ display: 'flex', position: 'relative' }}>
//           <Sup>$</Sup>
//           <Typography
//             variant='h3'
//             sx={{
//               mb: -1.2,
//               lineHeight: 1,
//               color: 'primary.main'
//             }}
//           >
//             9,99
//           </Typography>
//           <Sub>/ month</Sub>
//         </Box>
//       </CardContent>
// <CardContent>
// <Box sx={{ mt: 0, mb: 5 }}>
//           <Box
//             sx={{ display: 'flex', mb: 2.5, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}
//           >
         
//             <Typography component='span' sx={{ fontSize: '0.875rem' }}>
//               10 Users
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               mt: 2.5,
//               display: 'flex',
//               mb: 2.5,
//               alignItems: 'center',
//               '& svg': { mr: 2, color: 'text.secondary' }
//             }}
//           >
          
//             <Typography component='span' sx={{ fontSize: '0.875rem' }}>
//               Up to 10GB storage
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               mt: 2.5,
//               display: 'flex',
//               mb: 2.5,
//               alignItems: 'center',
//               '& svg': { mr: 2, color: 'text.secondary' }
//             }}
//           >
           
//             <Typography component='span' sx={{ fontSize: '0.875rem' }}>
//               Basic Support
//             </Typography>
//           </Box>
//         </Box>
//         <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
//           <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
//             Days
//           </Typography>
//           <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
//             26 of 30 Days
//           </Typography>
//         </Box>
//         <LinearProgress value={86.66} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
//         <Typography variant='caption' sx={{ mt: 1.5, mb: 6 }}>
//           4 days remaining
//         </Typography>
    
//         <Button variant='contained' sx={{ width: '100%', marginTop:'1em' }} >
//             More info
//         </Button>
// </CardContent>
// </Box>
// </Card>