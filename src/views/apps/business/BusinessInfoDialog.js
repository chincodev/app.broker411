import { useState, forwardRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import toast from 'react-hot-toast'
import Close from 'mdi-material-ui/Close'
import Check from 'mdi-material-ui/Check'
import DialogTabDetails from 'src/layouts/components/create-business-tabs/DialogTabDetails'
import { userService } from 'services/user.service'
import { Dialog } from '@mui/material'
import DialogTabFramework from 'src/layouts/components/create-business-tabs/DialogTabFramework'
import BusinessInfo from './BusinessInfo'
import { useAuth } from 'src/hooks/useAuth'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})




const BusinessInfoDialog = (props) => {

    const { setOpenDialog, openDialog, handleClose } = props
    const auth = useAuth()

  const [ businessData, setBusinessData ] = useState({})

 useEffect(() => {
    setBusinessData(auth.user.business)
 }, [auth])
 


  const handleSubmit = async () => {
    try {
      setActionsLoading(true)
      console.log(businessData)
      await userService.request_assign_carrier_owner({us_dot_number:businessData.us_dot_number})
      toast.success('A verification link was sent to your email inbox...')
      props.setVerify(true)
      props.setVerifyType('carrier')
      setOpenDialog(false)
      setActionsLoading(false)
      setActiveTab('detailsTab')
    } catch (er) {
      toast.error(er.errors[0].message === '"email" is required' ? 'You must have an email address registered on file with FMSCA so we can verify your carrier profile. Add an email into your FMSCA profile then come try again.' : er.errors[0].message)
      setOpenDialog(false)
      setActionsLoading(false)
      setActiveTab('detailsTab')
    }
  }



  return (
   
      <Dialog
        fullWidth
        open={openDialog}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: { xs: 5, sm: 12 },
            pl: { xs: 4, sm: 11 },
            pt: { xs: 8, sm: 12.5 },
            pb: { xs: 5, sm: 12.5 }
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 8, lineHeight: '2rem' }}>
              My Business
            </Typography>
            {/* <Typography variant='body2'>Provide data with this form to add your business.</Typography> */}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
         
          <BusinessInfo
               
                  businessData={businessData}
                  setBusinessData={setBusinessData}
                />
              
          </Box>
        </DialogContent>
      </Dialog>
    
  )
}

export default BusinessInfoDialog
