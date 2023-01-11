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
import { userService } from 'services/user.service'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

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

const TabLabel = props => {
  const { icon, title, subtitle, active } = props

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3.5,
            ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body2'>{title}</Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled', textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
const tabsArr = ['detailsTab', 'frameworkTab', 'submitTab']
 
const AddCarrierDialog = (props) => {
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('detailsTab')
  const [ actionsLoading, setActionsLoading ] = useState(false)

  const [ businessData, setBusinessData ] = useState({})

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleClose = async () => {
      setShow(false)
      setActionsLoading(false)
      setActiveTab('detailsTab')
  }

  const handleSubmit = async () => {
    try {
      setActionsLoading(true)
      console.log(businessData)
      await userService.request_assign_carrier_owner({us_dot_number:businessData.us_dot_number})
      toast.success('A verification link was sent to your email inbox...')
      props.setVerify(true)
      props.setVerifyType('carrier')
      setShow(false)
      setActionsLoading(false)
      setActiveTab('detailsTab')
    } catch (er) {
      toast.error(er.errors[0].message === '"email" is required' ? 'You must have an email address registered on file with FMSCA so we can verify your carrier profile. Add an email into your FMSCA profile then come try again.' : er.errors[0].message)
      setShow(false)
      setActionsLoading(false)
      setActiveTab('detailsTab')
    }
  }

  const NextArrow = direction === 'ltr' ? ArrowRight : ArrowLeft
  const PreviousArrow = direction === 'ltr' ? ArrowLeft : ArrowRight

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          disabled={actionsLoading}
          color='secondary'
          startIcon={<PreviousArrow />}
          disabled={activeTab === 'detailsTab'}
          onClick={() => setActiveTab(prevTab)}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          disabled={actionsLoading}
          endIcon={activeTab === 'submitTab' ? <Check /> : <NextArrow />}
          color={activeTab === 'submitTab' ? 'success' : 'primary'}
          onClick={() => {
            if (activeTab !== 'submitTab') {
              setActiveTab(nextTab)
            } else {
              handleSubmit()
            }
          }}
        >
          {activeTab === 'submitTab' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Card>
 
      <CardMedia sx={{ height: 140 }} image='/images/cards/carrier.jpg' />
      <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Carriers
        </Typography>
        <Typography sx={{ mb: 2 }}>Sign Up & Get Started Today</Typography>
        <Typography variant='body2'>
        Get Started For Free
        </Typography>
      </CardContent>
      <Button size='large' onClick={() => setShow(true)} variant='contained' sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        REGISTER AS CARRIER
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
              Sign up as Carrier
            </Typography>
            {/* <Typography variant='body2'>Provide data with this form to add your business.</Typography> */}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 200,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                <Tab
                  disabled={true}
                  disableRipple
                  value='detailsTab'
                  label={
                    <TabLabel
                      title='DOT'
                      subtitle='DOT Number'
                      icon={<ClipboardOutline />}
                      active={activeTab === 'detailsTab'}
                    />
                  }
                />
                <Tab
                  disabled={true}
                  disableRipple
                  value='frameworkTab'
                  label={
                    <TabLabel
                      title='Details'
                      icon={<ViewListOutline />}
                      subtitle='Carrier Details'
                      active={activeTab === 'frameworkTab'}
                    />
                  }
                />
                <Tab
                  disabled={true}
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel title='Submit' subtitle='Submit Request' active={activeTab === 'submitTab'} icon={<Check />} />
                  }
                />
              </TabList>
              <TabPanel value='detailsTab' sx={{ flexGrow: 1 }}>
                <DialogTabDetails
                  title={'Carrier DOT Number'}
                  startObj={{
                    type:'carrier'
                  }}
                  setActiveTab={setActiveTab}
                  businessData={businessData}
                  setBusinessData={setBusinessData}
                />
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='frameworkTab' sx={{ flexGrow: 1 }}>
                <DialogTabFramework
                  setActiveTab={setActiveTab}
                  businessData={businessData}
                  setBusinessData={setBusinessData}
                />
                {renderTabFooter()}
              </TabPanel>

              <TabPanel value='submitTab' sx={{ flexGrow: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  {
                    actionsLoading ? (
                      <Box sx={{ textAlign: 'center', marginTop:'4rem', marginBottom:'4rem' }}>
                        <CircularProgress />
                      </Box>

                    ) : (
                      <>
                        <Typography variant='h6'>Submit Mail</Typography>
                        <Typography variant='body2'>A verification mail will be sent to your inbox to verify your account.</Typography>
                        <Typography variant='body2'>IMPORTANT: THE VERIFICATION EMAIL IS SENT TO THE EMAIL ADDRESS THAT IS REGISTERED WITH THE FMSCA. CHECK THAT EMAIL TO VERIFY YOUR BROKER411 ACCOUNT.</Typography>
                        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                          <img alt='submit-img' src={`/images/pages/kb-api.png`} />
                        </Box>
                      </>
                    )
                  }

                </Box>
                {renderTabFooter()}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default AddCarrierDialog