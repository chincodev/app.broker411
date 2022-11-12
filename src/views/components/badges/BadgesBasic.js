// ** MUI Imports
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

const BadgesBasic = () => {
  return (
    <div className='demo-space-x'>
      <Badge badgeContent={4} color='primary'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='secondary'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='success'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='error'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='warning'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='info'>
        <Avatar src='https://avatars.dicebear.com/api/bottts/1.png' alt='User Avatar' />
      </Badge>
    </div>
  )
}

export default BadgesBasic
