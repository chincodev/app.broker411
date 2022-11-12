// ** MUI Imports
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

const BadgesAlignment = () => {
  return (
    <div className='demo-space-x'>
      <Badge color='primary' variant='dot'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge color='primary' variant='dot' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge color='primary' variant='dot' anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge color='primary' variant='dot' anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
    </div>
  )
}

export default BadgesAlignment
