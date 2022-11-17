// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import BrokerAds from './BrokerAds'
import LastestReviews from './LastestReviews'
import RatingProgress from './RatingProgress'
import ReviewsChart from './ReviewsChart'
import ReviewsOverview from './ReviewsOverview'
import SubscriptionOverview from './SubscriptionOverview'

const BrokerDashboard = () => {
  return (
    <ApexChartWrapper>
        <DatePickerWrapper>
            <Grid container spacing={6} className='match-height'>
              <Grid item xs={12} md={6}>
                <ReviewsOverview />
              </Grid>
              <Grid item xs={12} md={6}>
                <BrokerAds />
              </Grid>
  
              <Grid item xs={12} md={4}>
                <RatingProgress />
              </Grid>
              <Grid item xs={12} md={8}>
                <ReviewsChart />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <LastestReviews />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SubscriptionOverview />
              </Grid>
            </Grid>
        </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default BrokerDashboard
