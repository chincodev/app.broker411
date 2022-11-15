// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { useAuth } from 'src/hooks/useAuth'
import { IconButton } from '@mui/material'
import { AccountTie, AccountTieOutline, AccountTieVoice, FaceAgent, Home, HomeOutline, Laptop, Phone, PhoneOutline, Star, StarOutline, Truck, TruckOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings } = props

  const auth = useAuth()

  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      
        <IconButton onClick={()=>router.push('/')} color='inherit' aria-haspopup='true'>
          {
            (window.location.pathname === '/' || window.location.pathname.includes('dashboard')) ? (
              <Home style={{fontSize:'32px'}} />
            ) : (
              <HomeOutline style={{fontSize:'32px'}} />
            )
          }
        </IconButton>
    
        
        
        {
          auth.user.business && auth.user.business.type === 'carrier' && <IconButton onClick={()=>router.push('/brokers')} color='inherit' aria-haspopup='true'>
          {
            (window.location.pathname.includes('brokers')) ? (
              <Phone style={{fontSize:'32px'}} />
            ) : (
              <PhoneOutline style={{fontSize:'32px'}} />
            )
          }
        </IconButton>
        }
        {
          auth.user.business && auth.user.business.type === 'broker' && <>
            <IconButton onClick={()=>router.push('/reviews')} color='inherit' aria-haspopup='true'>
              {
                window.location.pathname === '/reviews/' 
                  ? <Star style={{fontSize:'32px'}} />
                  : <StarOutline style={{fontSize:'32px'}} />  
              }
            </IconButton>
            <IconButton color='inherit' aria-haspopup='true'>
              <TruckOutline onClick={()=>router.push('/carriers')} style={{fontSize:'32px'}} />
            </IconButton>
          </>
        }
     
        
     

      {/* {
        !auth.user.role.default && <Autocomplete hidden={hidden} settings={settings} />
      } */}
      
      {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      {/* <NotificationDropdown settings={settings} /> */}
      
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
