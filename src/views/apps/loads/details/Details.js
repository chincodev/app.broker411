// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import CustomChip from 'src/@core/components/mui/chip'
import MuiTimeline from '@mui/lab/Timeline'
import CustomTimelineDot from 'src/@core/components/mui/timeline-dot'
// ** Configs
import themeConfig from 'src/configs/themeConfig'
import moment from 'moment'
import { Avatar, Badge, Button, Icon, IconButton } from '@mui/material'
import { Chip, Delete, MapMarker, MapMarkerOutline, Router } from 'mdi-material-ui'
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import DeleteDialog from 'src/views/components/dialogs/DeleteDialog'
import DisableDialog from 'src/views/components/dialogs/DisableDialog'
import { useEffect, useState } from 'react'
import { loadService } from 'services/load.service'
import toast from 'react-hot-toast'
import LoadFormDialog from '../dialog'
import { useRouter } from 'next/router'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const Timeline = styled(MuiTimeline)({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop:0,
    marginTop:0,
    paddingBottom:0,
    marginBottom:0,
    '& .MuiTimelineItem-root': {
      width: '100%',
      '&:before': {
        display: 'none'
      }
    }
  })

const LoadDetails = ({ 
    id,
    data,
    code 
}) => {
  // ** Hook
  const userStatusObj = {
    true: 'success',
    false: 'error'
  }
  const theme = useTheme()


  const [ scopedDialogToDisable, setScopedDialogToDisable ] = useState(null)
  const [ scopedDialogToDelete, setScopedDialogToDelete ] = useState(null)
  const [ scopedLoadToEdit, setScopedLoadToEdit ] = useState(null)
  const [ isDialogOpen, setIsDialogOpen ] = useState(null)

  const [ loading, setLoading ] = useState(false)
  const [ _data, set_data ] = useState(data)

  const disableLoad = async (id, value) => {
    try {
      setLoading(true)
      const values = {
        pickup_earliest_date: _data.pickup_earliest_date,
        pickup_latest_date: _data.pickup_latest_date,
        pickup_hours_start: _data.pickup_hours_start,
        pickup_hours_end: _data.pickup_hours_end,
        delivery_hours_start: _data.delivery_hours_start,
        delivery_hours_end: _data.delivery_hours_end,
        origin_city_id: _data.origin_city_id,
        destination_city_id: _data.destination_city_id,
        full_partial: _data.full_partial,
        weight: _data.weight,
        length: _data.length,
        comments: _data.comments,
        commodity: _data.commodity,
        contact_phone: _data.contact_phone,
        contact_email: _data.contact_email,
        rate: _data.rate,
        categories: _data.categories.map(x => x.id),
        is_enabled: value
      }
      await loadService.update(data.id, values)
      set_data({
        ..._data,
        is_enabled: value
      })
      toast.success('Load #'+id+' status changed')
      setLoading(false)
    } catch (er){
      if(er.errors && Array.isArray(er.errors)){
        er.errors.map(x => toast.error(x.message))
      }
    }
  }

  useEffect(() => {
    set_data(data)
  }, [data])


  const reload = async() => {
    try {
      setLoading(true)
      const response = await loadService.find(id)
      set_data(response)
      setLoading(false)
    } catch (er) {
      console.log(er);
    }
  }

  const router = useRouter()

  const deleteLoad = async (id) => {

		try {
			await setLoading(true)
			// await loadService.delete(id)
			await setLoading(false)
			toast.success('Load #'+id+' have been removed')
      const previousPath = router
      console.log(previousPath);
      if(!router.back()) router.push('/loads')
      
			
		} catch (er){
      console.log(er);
			if(er.errors && Array.isArray(er.errors)){
				er.errors.map(x => toast.error(x.message))
			}
		}
	}




  if (_data) {
    return (
      <Card>
        <DisableDialog
			    title = {!_data.is_enabled ? 'Enable Load #'+_data.id : 'Disable Load #'+_data.id }
			    subtitle = {!_data.is_enabled ? 'If you proceed, this load will appear in the loadboard. Are you sure you want to disable it?' : 'If you proceed, this load will not appear in the loadboard. Are you sure you want to disable it?'}
			    disableRecord = { (id, value) => disableLoad(id, value) }
          is_enabled = {_data.is_enabled}
			    recordId = { _data.id }
			    open = {Boolean(scopedDialogToDisable)}
			    setOpen = {setScopedDialogToDisable}
			  />
        <LoadFormDialog 
				open={isDialogOpen}
				setOpen={setIsDialogOpen}
				reload={reload}
				scopedLoadToEdit={scopedLoadToEdit}
				setScopedLoadToEdit={setScopedLoadToEdit}
			/>
        <DeleteDialog
				  title = {'Delete Load #'+_data.id}
				  subtitle = {'If you delete this record you wont be able to get it back. Are you sure you want to delete the selected load?'}
				  deleteRecord = { deleteLoad }
				  recordId = { _data.id }
				  open = {Boolean(scopedDialogToDelete)}
				  setOpen = {setScopedDialogToDelete}
			  /> 
        <CardContent>
          {console.log(_data)}
          <Grid container>
            {console.log(_data)}
            <Grid item >
              <Box sx={{ display: 'flex'}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>Load</Typography>
                      </MUITableCell>
                      <MUITableCell>
                       <Box sx={{display:'flex', alignItems:'center'}}>
                            <Typography variant='h6'>&nbsp;&nbsp;{`#${_data.id}`}</Typography>
                            <CustomChip
                              skin='light'
                              size='small'
                              label={_data.is_enabled ? 'Active' : 'Disabled'}
                              color={userStatusObj[_data.is_enabled]}
                              sx={{ marginLeft:'.5rem', textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
                            />
                        </Box> 
                        
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>&nbsp;&nbsp;{moment(_data.createdAt).format('MMMM Do YYYY')}</Typography>
                        
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider

        />

        <CardContent>
            <Grid container>
                <Grid item xs={12} md={6}>
                <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <CustomTimelineDot skin='light' color='secondary'>
                      <MapMarkerOutline sx={{fontSize:'20px'}} />
                    </CustomTimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator> 
                  <TimelineContent>
                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant='body2'
                        sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
                      >
                        <span>Origin</span>
                      </Typography>
                   
                    </Box>
                    <Typography variant='body1' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                      {_data.origin.name}, {_data.origin.state.abbreviation}
                    </Typography>
                    
                  </TimelineContent> 
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <CustomTimelineDot skin='light' color='success'>
                      <MapMarkerOutline sx={{fontSize:'20px'}} />
                    </CustomTimelineDot>
                    
                  </TimelineSeparator> 
                  <TimelineContent>
                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant='body2'
                        sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
                      >
                        <span>Destination</span>
                      </Typography>
                    
                    </Box>
                    <Typography variant='body1' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                      {_data.destination.name}, {_data.destination.state.abbreviation}
                    </Typography>
                    
                  </TimelineContent> 
                </TimelineItem>
            </Timeline>
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography variant={'body2'}><strong>Pickup earliest date:</strong> {moment(_data.pickup_earliest_date).format('DD Mo YYYY')}</Typography>
                    <Typography variant={'body2'}><strong>pickup lastest date:</strong> {`${_data.pickup_latest_date ? moment(_data.pickup_latest_date).format('DD Mo YYYY') : '-'}`}</Typography>
                    <Typography variant={'body2'}><strong>Pickup earliest hour :</strong> {_data.pickup_hours_start}</Typography>
                    <Typography variant={'body2'}><strong>Pickup lastest hour:</strong> {_data.pickup_hours_end}</Typography>
                    <Typography variant={'body2'}><strong>Delivery earliest hour:</strong> {_data.delivery_hours_start}</Typography>
                    <Typography variant={'body2'}><strong>Delivery lastest hour:</strong> {_data.delivery_hours_end}</Typography>
                    <Typography variant={'body1'}><strong>Rate:</strong> {_data.rate}</Typography>
                </Grid>
            </Grid>
        </CardContent>

        <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />


        <CardContent>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Typography variant={'body2'}><strong>Full / Partial:</strong> {_data.full_partial}</Typography>
                <Typography variant={'body2'}><strong>Weight:</strong> {_data.weight}</Typography>
                <Typography variant={'body2'}><strong>Length:</strong> {_data.length}</Typography>
                <Typography variant={'body2'}><strong>Load Type:</strong> {_data.categories.map((x, i) => `${x.name} (${x.abbreviation})${i === _data.categories.length -1 ? '' : ', '}`)}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant={'body2'}><strong>Comments:</strong> {_data.comments}</Typography>
                <Typography variant={'body2'}><strong>Commodity:</strong> {_data.commodity}</Typography>
                <Typography variant={'body2'}><strong>Contact Phone:</strong> {_data.contact_phone}</Typography>
                <Typography variant={'body2'}><strong>Contact Email:</strong> {_data.contact_email}</Typography>
            </Grid>
            </Grid>
        </CardContent> 
        <CardContent>
            <Grid item xs={12} sx={{mt:6}}>
              <Button onClick={
                ()=>{
                  setScopedLoadToEdit(_data)
                  setIsDialogOpen(true)
                }
              } disabled={loading} variant='outlined' type='submit' sx={{ mr: 3 }}>
                Edit
              </Button>
              {
                _data.is_enabled ? (
                  <Button disabled={loading} onClick={()=>setScopedDialogToDisable(_data)} variant='outlined' color='warning' type='submit' sx={{ mr: 3 }}>
                    Disable
                  </Button>
                ) : (
                  <Button disabled={loading} onClick={()=>setScopedDialogToDisable(data)} variant='outlined' color='info' type='submit' sx={{ mr: 3 }}>
                    Enable
                  </Button>
                )
              }
              <Button onClick={
                ()=>{
                  setScopedDialogToDelete(_data)
                }
              } disabled={loading} variant='outlined' type='submit' color='error' sx={{ mr: 3 }}>
                Delete
              </Button>
            </Grid>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default LoadDetails
