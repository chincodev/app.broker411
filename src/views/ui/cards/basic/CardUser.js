// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Divider } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'

const CardUser = () => {

  const auth = useAuth()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
        >
          <Avatar
            alt='Robert Meyer'
            src='/images/avatars/3.png'
            sx={{
              width: 78,
              height: 78,
              marginRight:'1em',
              border: theme => `5px solid ${theme.palette.common.white}`
            }}
          />
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>{auth.user.username}</Typography>
            <Typography variant='caption'>{auth.user?.business.legal_name}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Button sx={{mb:3, mt: 3}} fullWidth variant='contained'>Write a review</Button>
          <Button fullWidth color='secondary' variant='contained'>Search Broker</Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardUser
