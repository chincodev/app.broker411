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
import { Button, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import AddCarrierDialog from 'src/layouts/AddCarrierDialog'
import { useAuth } from 'src/hooks/useAuth'
import { isEmpty } from 'lodash'
import VerifyBusinessDialog from 'src/layouts/VerifyBusinessDialog'
import { useEffect, useState } from 'react'
import AddBrokerDialog from 'src/layouts/AddBrokerDialog'
import CardUser from 'src/views/ui/cards/basic/CardUser'
import Feed from 'src/views/dashboards/feed'
import BrokerDashboard from 'src/views/apps/broker_dashboard'

const CrmDashboard = () => {

  const auth = useAuth()
  
  const [verify, setVerify] = useState(false)
  const [verifyType, setVerifyType] = useState('')



  useEffect(() => {
    if(verify){
      window.location.reload()
    }
  }, [verify])
  

  if(verify){
    return <VerifyBusinessDialog verifyType={verifyType} />
  }


  if(isEmpty(auth.user.business) && isEmpty(auth.user.request_business)){
    return <Grid container spacing={4}>
      <Grid item xs={12} sm={6} lg={4}>
        <AddBrokerDialog setVerify={setVerify} setVerifyType={()=>setVerifyType} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <AddCarrierDialog setVerify={setVerify} setVerifyType={setVerifyType} />
      </Grid>
    </Grid>
  }

  if(!isEmpty(auth.user.request_business)){
    return <VerifyBusinessDialog verifyType={verifyType} />
  }


  if(auth.user.business.type === 'carrier'){
    return (
      <Feed />
    )
  }
  if(auth.user.business.type === 'broker'){
    return (
      <BrokerDashboard />
    )
  }
  return (
    <Feed />
  )
}

export default CrmDashboard
