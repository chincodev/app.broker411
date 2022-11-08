// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import { Button, IconButton } from '@mui/material'
import { CameraIris } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'

const StyledLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const AppBarContent = props => {
  // ** Props
  const {
    horizontalAppBarContent: userHorizontalAppBarContent,
    horizontalAppBarBranding: userHorizontalAppBarBranding
  } = props

  const auth = useAuth() 

  // ** Hooks
  const theme = useTheme()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userHorizontalAppBarBranding ? (
        userHorizontalAppBarBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <img height={28} src='/images/logos/logo.png' />
            <Typography variant='h6' sx={{ ml: 2, mr: 2, fontWeight: 700, lineHeight: 1.2 }}>
              {themeConfig.templateName}
            </Typography>
            {
              auth.user.role.name === 'guest' ? (
                <>
                   <Button  color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname === '/admin/' ? 'contained' : ''} aria-label='capture screenshot'>
                    Home
                  </Button>
                </>
              ) : auth.user.role.name === 'administrator' ? (
                <>
                   <Button  color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname === '/admin/' ? 'contained' : ''} aria-label='capture screenshot'>
                    Home
                  </Button>
                  <Link href={'/admin/fields'}>
                    <Button  color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname.includes('/admin/fields/') ? 'contained' : ''} aria-label='capture screenshot'>
                      Fields
                    </Button>
                  </Link>
                  <Link href={'/admin/businesses'}>
                    <Button color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname.includes('/admin/businesses/') ? 'contained' : ''} aria-label='capture screenshot'>
                      Businesses
                    </Button>
                  </Link>
                  <Link href={'/admin/users'}>
                    <Button  color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname.includes('/admin/users/') ? 'contained' : ''} aria-label='capture screenshot'>
                      Users
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname.includes('/admin/') ? 'contained' : ''} aria-label='capture screenshot'>
                    Home
                  </Button>
                  <Button color="primary" style={{marginLeft:'0.5rem', paddingRight:'1rem', paddingLeft:'1rem'}} variant={window.location.pathname.includes('/admin/brokers/') ? 'contained' : ''} aria-label='capture screenshot'>
                    Brokers
                  </Button>
                </>
              )
            }
           
            {/* <Button style={{marginLeft:'0.5rem'}} aria-label='capture screenshot'>
              Hello
            </Button>
            <Button style={{marginLeft:'0.5rem'}} aria-label='capture screenshot'>
              Hello
            </Button> */}
          </StyledLink>
        </Link>
      )}
      {userHorizontalAppBarContent ? userHorizontalAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
