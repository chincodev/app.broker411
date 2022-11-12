// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

const AvatarsGrouped = () => {
  return (
    <div className='demo-space-y'>
      <AvatarGroup max={4}>
        <Avatar src='https://avatars.dicebear.com/api/bottts/4.png' alt='Olivia Sparks' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/5.png' alt='Howard Lloyd' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/6.png' alt='Hallie Richards' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/8.png' alt='Alice Cobb' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/7.png' alt='Jeffery Warner' />
      </AvatarGroup>
      <AvatarGroup max={4} sx={{ justifyContent: 'center' }}>
        <Avatar src='https://avatars.dicebear.com/api/bottts/4.png' alt='Olivia Sparks' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/5.png' alt='Howard Lloyd' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/6.png' alt='Hallie Richards' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/8.png' alt='Alice Cobb' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/7.png' alt='Jeffery Warner' />
      </AvatarGroup>
      <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
        <Avatar src='https://avatars.dicebear.com/api/bottts/4.png' alt='Olivia Sparks' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/5.png' alt='Howard Lloyd' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/6.png' alt='Hallie Richards' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/8.png' alt='Alice Cobb' />
        <Avatar src='https://avatars.dicebear.com/api/bottts/7.png' alt='Jeffery Warner' />
      </AvatarGroup>
    </div>
  )
}

export default AvatarsGrouped
