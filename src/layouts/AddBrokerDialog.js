// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import toast from 'react-hot-toast'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Check from 'mdi-material-ui/Check'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import ArrowRight from 'mdi-material-ui/ArrowRight'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import StarOutline from 'mdi-material-ui/StarOutline'
import ClipboardOutline from 'mdi-material-ui/ClipboardOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import CircularProgress from '@mui/material/CircularProgress'
// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Tab Content Imports
import DialogTabDetails from 'src/layouts/components/create-business-tabs/DialogTabDetails'
import DialogTabBilling from 'src/layouts/components/create-business-tabs/DialogTabBilling'
import DialogTabDatabase from 'src/layouts/components/create-business-tabs/DialogTabDatabase'
import DialogTabFramework from 'src/layouts/components/create-business-tabs/DialogTabFramework'
import { styled } from '@mui/material/styles'
import { CardHeader, CardMedia, Divider } from '@mui/material'
import { businessService } from 'services/business.service'
import { ViewListOutline } from 'mdi-material-ui'
import DialogTabBrokerMc from './components/create-business-tabs/DialogTabBrokerMc'
import DialogTabBrokerDetails from './components/create-business-tabs/DialogTabBrokerDetails'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})




const AddBrokerDialog = (props) => {
  // ** States
  const [show, setShow] = useState(false)
  const [ actionsLoading, setActionsLoading ] = useState(false)

  const [ businessData, setBusinessData ] = useState({
    type:'carrier'
  })

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleClose = async () => {
      setShow(false)
      setActionsLoading(false)
  }

 


  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image='/images/cards/broker.png' />
      <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Broker
        </Typography>
        <Typography sx={{ mb: 2 }}>Get Started For $9.99/Month</Typography>
        <Typography variant='body2'>
        Sign Up & Get Started Today
        </Typography>
      </CardContent>
      <Button size='large' onClick={() => setShow(true)} variant='contained' sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Register as Broker
      </Button>
      <Dialog
        fullWidth
        open={show}
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
              Add Broker
            </Typography>
            {/* <Typography variant='body2'>Provide data with this form to add your business.</Typography> */}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
           
          <DialogTabBrokerDetails
                  businessData={businessData}
                  setBusinessData={setBusinessData}
                  handleClose={handleClose}
                  setVerify={props.setVerify}
                />
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default AddBrokerDialog
