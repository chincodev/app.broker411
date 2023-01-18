import { Alert, AlertTitle, Box, Button, Card, CardContent, CardHeader, Grid, LinearProgress, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import Link from 'next/link'
import React, { useState } from 'react'
import moment from 'moment'
import ReviewDetails from 'src/views/apps/review/details/Details'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import review from 'src/store/apps/review'
import { reviewService } from 'services/review.service'
import { reportService } from 'services/report.service'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const ReportViewPage = (props) => {

    const { data, code, id } = props

    const [ loading, setLoading ] = useState(false)
    const router = useRouter()

    const disableReview = async (review_id, report_id) => {

      try {
        setLoading(true)
        await reviewService.update(review_id, {is_enabled: false})
        await reportService.update(report_id, {is_checked: true})
        toast.success('Review has been disabled.')
        router.back()
        setLoading(false)
      } catch (er) {
        setLoading(false)
        console.log(er);
      }

    }

    const invalidateReport = async (report_id) => {

      try {
        setLoading(true)
        await reportService.update(report_id, {is_checked: true})
        toast.success('Report marked as checked.')
        setLoading(false)
        router.back()
      } catch (er) {
        setLoading(false)
        console.log(er);
      }

    }


    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                      <a style={{textDecoration:'none'}}>
                          <Typography color="secondary">Admin</Typography>
                      </a>
                  </Link>
                  <Link
                      underline="hover"
                      color="inherit"
                      href="/admin/reports"

                  >
                      <a style={{textDecoration:'none'}}>
                          <Typography color="secondary">Reports</Typography>
                      </a>
                  </Link>
                  <Typography color="text.primary">Report #{props.id}</Typography>
              </Breadcrumbs>
              <br />
              <Card>
                <CardHeader title={`Report #${id} by @${data.user.username}`} />
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 4 }}>
                        <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1rem', fontWeight:'700' }}>
                          Date
                        </Typography>
                        <Typography variant='body2'>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                      </Box>
                      <Box sx={{ mb: 4 }}>
                        <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1rem', fontWeight:'700' }}>
                          Account Data
                        </Typography>
                        <Typography variant='body2'>@{data.user.username}</Typography>
                        <Typography variant='body2'>{data.user.name}</Typography>
                        <Typography variant='body2'>{data.user.email}</Typography>
                      </Box>

                      {
                        data.user.contact_email || data.user.phone && (
                          <Box sx={{ mb: 4 }}>
                            <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '1rem', fontWeight:'700' }}>
                              Contact Data
                            </Typography>
                            <Typography variant='body2'>{data.user.contact_email}</Typography>
                            <Typography variant='body2'>{data.user.phone}</Typography>
                          </Box>
                        )
                      }
                      
                      
                      <div>
                        <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                          <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '1rem', fontWeight:'700' }}>User Business</Typography>
                        </Box>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                          <Link href={`/admin/business/[id]`} as={`/admin/business/${data.user.business.id}`}>
                            <a style={{textDecoration:'none'}}>
                              <Typography variant='body2' color='Highlight'>{data.user.business.legal_name}</Typography>
                            </a>
                          </Link>
                          <CustomChip
                              skin='light'
                              size='small'
                              label={`${data.user.business.type.toUpperCase()}`}
                              color='primary'
                              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600, borderRadius: '5px', marginLeft:'5px' }}
                          />
                        </Box>
                        {
                          data.user.business.us_dot_number && <Typography variant='body2'>DOT: {data.user.business.us_dot_number}</Typography>
                        }
                        
                        {data.user.business.mc_mx_ff_numbers && <Typography variant='body2'>{data.user.business.mc_mx_ff_numbers}</Typography>}
                      </div>
                      {/* <Button sx={{mt:4}} variant='contained'>Mark as checked</Button> */}
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
                      <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
                        <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                          Notes
                        </AlertTitle>
                        {data.body || 'No notes available'}
                      </Alert>
                      <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Reasons</Typography>
                        {/* <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>26 of 30 Days</Typography> */}
                      </Box>
                      {/* <LinearProgress value={86.6666666} variant='determinate' sx={{ height: 10, borderRadius: '5px' }} /> */}
                      <ul>
                        {
                          data.categories.map(x => <Typography variant='body2'>
                              <li>{x.description}</li>
                          </Typography>)
                        }
                      </ul>
                    </Grid>

                    {/* <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <Button variant='contained' onClick={handleUpgradePlansClickOpen} sx={{ mr: 3, mb: [3, 0] }}>
                        Upgrade Plan
                      </Button>
                      <Button variant='outlined' color='error' onClick={() => setSubscriptionDialogOpen(true)}>
                        Cancel Subscription
                      </Button>
                    </Grid> */}
                     <Grid item xs={12}>
                      <Button disabled={loading || !data.review.is_enabled} onClick={()=>disableReview(data.review.id, data.id)} variant='contained' color='error' sx={{ mr: 3 }}>
                        Disable review
                      </Button>
                      <Button disabled={loading || data.is_checked} onClick={()=>invalidateReport(data.id)} variant='contained' sx={{ mr: 3 }}>
                        Mark as checked
                      </Button>
                      {/* <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
                        Reset
                      </Button> */}
                    </Grid>
                  </Grid>
                 
                </CardContent>

                
              </Card>
            
              <h2>Review details</h2>
              <Card>
                <ReviewDetails 
                  data={data.review} 
                  page={true} 
                  top={data.review.business}
                  id={data.review.id} 
                />
              </Card>
            </Grid>
        </Grid>
    )

}

export default ReportViewPage