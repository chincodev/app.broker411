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
import { CardHeader, Divider } from '@mui/material'
import { businessService } from 'services/business.service'

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

const DialogCreateBusiness = () => {
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
    try {
      setActionsLoading(true)
      await businessService.create(businessData)
      toast.success('A verification link was sent to your email inbox...')
      setShow(false)
      setActionsLoading(false)
      setActiveTab('detailsTab')
    } catch (er) {
      toast.error(er.errors[0].message)
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
              handleClose()
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
      {console.log(businessData)}
      <CardHeader sx={{ textAlign: 'center', fontWeight:'900' }} title='Welcome to Broker411' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent sx={{ textAlign: 'center' }}>
        <Img alt='error-illustration' src='/images/cards/illustration-upgrade-account.png' />
        <Typography sx={{ mb: 3 }}>
          Provide application data with this form to create the Business.
        </Typography>
        <Divider sx={{ m: 0 }} />
        <Button sx={{mt: 4}} variant='contained' onClick={() => setShow(true)}>
          Add Business
        </Button>
      </CardContent>
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
              Add Business
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
                      title='Details'
                      subtitle='Enter Details'
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
                      title='Frameworks'
                      icon={<StarOutline />}
                      subtitle='Select Framework'
                      active={activeTab === 'frameworkTab'}
                    />
                  }
                />
                {/* <Tab
                  disableRipple
                  value='DatabaseTab'
                  label={
                    <TabLabel
                      title='Database'
                      active={activeTab === 'DatabaseTab'}
                      subtitle='Select Database'
                      icon={<ChartDonut />}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='paymentTab'
                  label={
                    <TabLabel
                      title='Billing'
                      active={activeTab === 'paymentTab'}
                      subtitle='Payment details'
                      icon={<CreditCardOutline />}
                    />
                  }
                /> */}
                <Tab
                  disabled={true}
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel title='Submit' subtitle='Submit' active={activeTab === 'submitTab'} icon={<Check />} />
                  }
                />
              </TabList>
              <TabPanel value='detailsTab' sx={{ flexGrow: 1 }}>
                <DialogTabDetails
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
              {/* <TabPanel value='DatabaseTab' sx={{ flexGrow: 1 }}>
                <DialogTabDatabase />
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='paymentTab' sx={{ flexGrow: 1 }}>
                <DialogTabBilling />
                {renderTabFooter()}
              </TabPanel> */}
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

export default DialogCreateBusiness
