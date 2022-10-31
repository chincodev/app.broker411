import { useState } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { CardHeader, Divider } from '@mui/material'
import { businessService } from 'services/business.service'
import toast from 'react-hot-toast'

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


const VerifyBusinessDialog = () => {

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

  return (
    <Card>
      <CardHeader sx={{ textAlign: 'center', fontWeight:'900' }} title='Business Verification Pending' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Img alt='error-illustration' src='/images/pages/kb-personalization.png' />
        <Typography sx={{ mb: 3 }}>
          Please check your email inbox to verify your business. If you didn't receive it, try to resend.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          If you signed up as a broker, you must wait until an administrator review your information before you receive the verification.
        </Typography>
        <Divider sx={{ m: 0 }} />
        <Button disabled={sending} onClick={()=>resendVerificationMail()} sx={{mt: 4}} variant='contained' >
          Resend Mail
        </Button>
      </CardContent>
    </Card>
  )
}

export default VerifyBusinessDialog
