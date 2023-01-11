import { useState } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { CardHeader, Divider } from '@mui/material'
import { businessService } from 'services/business.service'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))


const VerifyBusinessDialog = (props) => {

  const [sending, setSending] = useState(false)

  const resendVerificationMail = async () => {
    try {
      setSending(true)
      await businessService.resendVerification()
      setSending(false)
      toast.success('Verification mail sent!')
    } catch (er) {
      console.log(er)
      setSending(false)
      toast.error(er.errors ? er.errors[0]['message'] : er.message)

    }
  }

  const auth = useAuth()

  return (
    <Card>
      <CardHeader sx={{ textAlign: 'center', fontWeight:'900' }} title='Verification Pending' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Img alt='error-illustration' src='/images/pages/kb-personalization.png' />
        {
          props.verifyType === 'broker' ||( auth.user.request_business && auth.user.request_business.type === 'broker') ? <Typography sx={{ mb: 3 }}>
          Your request to join as broker {auth.user.request_business ? <strong>at {auth.user.request_business.legal_name}</strong> : ''}  is pending<br />We will let you know when the verification is completed
        </Typography> : ''
        }

{
          props.verifyType === 'carrier' || (auth.user.request_business && auth.user.request_business.type === 'carrier') ? <><Typography sx={{ mb: 3 }}>
          Your request to join as carrier {auth.user.business ? <strong>at {auth.user.business.legal_name}</strong> : ''}  is pending<br /><strong>Check your email to complete the verification process. Check your promotions or spam folder if you don't see the email.</strong>
        </Typography><Typography sx={{ mb: 3 }}>IMPORTANT: THE VERIFICATION EMAIL IS SENT TO THE EMAIL ADDRESS THAT IS REGISTERED WITH THE FMSCA. CHECK THAT EMAIL TO VERIFY YOUR BROKER411 ACCOUNT.</Typography></> : ''
        }
        
        <Typography sx={{ mb: 3 }}>
          
        </Typography>
        {
          props.verifyType === 'carrier' || (auth.user.business && auth.user.business.type === 'carrier') && (
            <>
              <Divider sx={{ m: 0 }} />
              <Button disabled={sending} onClick={()=>resendVerificationMail()} sx={{mt: 4}} variant='contained' >
                Resend Mail
              </Button>
            </>
          )
        }
        
      </CardContent>
    </Card>
  )
}

export default VerifyBusinessDialog

