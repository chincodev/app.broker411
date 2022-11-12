// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import { Button, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import { CameraIris, Magnify, Router } from 'mdi-material-ui'
import { useAuth } from 'src/hooks/useAuth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const StyledLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const StyledTextField = styled(TextField)`
 
    background-color: ${({theme, value}) => 
      !value && theme.palette.background.paper};
  
`

const AppBarContent = props => {
  // ** Props
  const {
    horizontalAppBarContent: userHorizontalAppBarContent,
    horizontalAppBarBranding: userHorizontalAppBarBranding
  } = props

  const [ search, setSearch ] = useState('')

  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    let isnum = /^\d+$/.test(search);
    if(search === ''){toast.error('Search field can not be empty.')} else if(isnum){
      router.push('/brokers/[id]', '/brokers/'+search)
    } else {
      toast.error('Only numbers allowed.')
    }
  }

  const auth = useAuth() 

  // ** Hooks
  const theme = useTheme()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userHorizontalAppBarBranding ? (
        userHorizontalAppBarBranding(props)
      ) : (
        <Box>
          <Link href='/' passHref>
          <StyledLink>
            <img height={28} src='/images/logos/logo.png' />
            <Typography variant='h6' sx={{ ml: 2, mr: 2, fontWeight: 700, lineHeight: 1.2 }}>
              {themeConfig.templateName}
            </Typography>
          </StyledLink>
          </Link>
        </Box>
         
      )
      }
       {
        auth.user.business && auth.user.business.type === 'carrier' && <form onSubmit={(e)=>onSubmit(e)} style={{width:'50%'}}>
        <StyledTextField value={search} onChange={(e) => setSearch(e.target.value)} type='search' variant={'outlined'} size={'small'} placeholder={'Enter Broker\'s DOT Number'} style={{width:'100%'}}
        InputProps={{
         startAdornment: (
           <InputAdornment position='start'>
             <Magnify />
           </InputAdornment>
         )
       }}
        ></StyledTextField>
        </form>
       }
      {userHorizontalAppBarContent ? userHorizontalAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
