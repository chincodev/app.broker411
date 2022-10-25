// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// ** Icon Imports
import CartPlus from 'mdi-material-ui/CartPlus'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmAward from 'src/views/dashboards/crm/CrmAward'
import CrmTable from 'src/views/dashboards/crm/CrmTable'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from 'src/views/dashboards/crm/CrmTotalProfit'
import CrmMonthlyBudget from 'src/views/dashboards/crm/CrmMonthlyBudget'
import CrmExternalLinks from 'src/views/dashboards/crm/CrmExternalLinks'
import CrmWeeklyOverview from 'src/views/dashboards/crm/CrmWeeklyOverview'
import CrmPaymentHistory from 'src/views/dashboards/crm/CrmPaymentHistory'
import CrmOrganicSessions from 'src/views/dashboards/crm/CrmOrganicSessions'
import CrmProjectTimeline from 'src/views/dashboards/crm/CrmProjectTimeline'
import CrmMeetingSchedule from 'src/views/dashboards/crm/CrmMeetingSchedule'
import CrmSocialNetworkVisits from 'src/views/dashboards/crm/CrmSocialNetworkVisits'
import CrmMostSalesInCountries from 'src/views/dashboards/crm/CrmMostSalesInCountries'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import DialogCreateBusiness from 'src/layouts/AddBusinessDialog'
import { useAuth } from 'src/hooks/useAuth'
import { isEmpty } from 'lodash'
import VerifyBusinessDialog from 'src/layouts/VerifyBusinessDialog'

const CrmDashboard = () => {

  const auth = useAuth()

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

  return (
    <Box className='content-center'>
      {
        (!isEmpty(auth.user.business)) ? (
          <VerifyBusinessDialog />
        ) : (
          <DialogCreateBusiness />
        )
      }
    </Box>
  )
}

export default CrmDashboard
