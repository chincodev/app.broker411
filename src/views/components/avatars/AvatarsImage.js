// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

const AvatarsImage = () => {
  return (
    <Box className='demo-space-x' sx={{ display: 'flex' }}>
      <Avatar src='https://avatars.dicebear.com/api/adventurer-neutral/1.png' alt='Victor Anderson' />
      <Avatar src='https://avatars.dicebear.com/api/adventurer-neutral/8.png' alt='Alice Cobb' />
      <Avatar src='https://avatars.dicebear.com/api/adventurer-neutral/7.png' alt='Jeffery Warner' />
    </Box>
  )
}

export default AvatarsImage
