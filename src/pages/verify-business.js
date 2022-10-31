// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { CircularProgress, Divider } from '@mui/material'
import { green } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { businessService } from 'services/business.service'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const VerifyBusiness = () => {
  // ** Hook
  const theme = useTheme()

  const [ noToken, setNoToken ] = useState(false)

  const [ error, setError ] = useState(false)
  
  const [ actionsLoading, setActionsLoading ] = useState(true)
  const handleSubmit = e => {
    e.preventDefault()
  }

  const verifyBusiness = async () => {
    try {
      setActionsLoading(true)
      const params = new URLSearchParams(window.location.search);
      let token = params.get('token')
      if(!token){
        setNoToken(true)
      }
      await businessService.verify(token)
      setActionsLoading(false)
      setTimeout(() => {
        window.location.replace('/')
      }, 5000);
    } catch (er) {
      if(er.errors && er.errors.length > 0 && er.errors[0]['message'])
      setError(er.errors[0]['message'])
      setActionsLoading(false)
    }
  }

  useEffect(() => {
    verifyBusiness()
  }, [])
  

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fillOpacity='0.4'
                fill='url(#paint0_linear_7821_79167)'
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fillOpacity='0.4'
                fill='url(#paint1_linear_7821_79167)'
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
              />
              <defs>
                <linearGradient
                  y1='0'
                  x1='25.1443'
                  x2='25.1443'
                  y2='143.953'
                  id='paint0_linear_7821_79167'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop />
                  <stop offset='1' stopOpacity='0' />
                </linearGradient>
                <linearGradient
                  y1='0'
                  x1='25.1443'
                  x2='25.1443'
                  y2='143.953'
                  id='paint1_linear_7821_79167'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop />
                  <stop offset='1' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6.5, pb: 3.5, alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column', borderBottom:'1px solid #646464'}}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              Business Verification
            </Typography>
            
          </Box>
          <Box sx={{ mb: 2, alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
          {
              noToken ? (
                <>
                
                  <Typography variant='h7'  sx={{ mb: 4, letterSpacing: '0.18px', fontWeight: 600 }}>
                    Please use a valid verification url!
                  </Typography>
                  {/* <Button onClick={()=>window.location.replace('/')} variant='contained'>Go to home</Button> */}
                </>
              ) : actionsLoading ? ( 
                <>
                  <Typography variant='body2'>
                    Please wait while verification finishes...
                  </Typography>
                  <br />
                  <CircularProgress
                    size={48}
                    sx={{
                      color: green[500],
                    }}
                  />
                </>
              ) : error ? <>
                <Typography variant='h7'  sx={{ mb: 4, letterSpacing: '0.18px', fontWeight: 600 }}>
                    {error}
                  </Typography>
                  {/* <Button onClick={()=>window.location.replace('/')} variant='contained'>Go to home</Button> */}
              </> : <Typography variant='h7'  sx={{ mb: 4, letterSpacing: '0.18px', fontWeight: 600 }}>
                    Business verification succeed! You will be redirected in 5 seconds!
                  </Typography>
              }
          </Box>
          
        </CardContent>
      </Card>

      <FooterIllustrationsV1 image={`/images/pages/auth-v1-forgot-password-mask-${theme.palette.mode}.png`} />
    </Box>
  )
}
VerifyBusiness.getLayout = page => <BlankLayout>{page}</BlankLayout>
VerifyBusiness.guestGuard = false
VerifyBusiness.authGuard = false
export default VerifyBusiness
