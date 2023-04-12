// ** React Imports
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { Button, Card, CircularProgress, FormControlLabel, IconButton, MenuItem, Pagination, Select, Switch, TextField, Tooltip, Typography } from '@mui/material'
import urlManager from '../../../../../utils/urlManager'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getLoads, setLoading } from 'src/store/apps/load'
import { useDispatch } from 'react-redux'
import ReviewCard from 'src/views/apps/business/view/ReviewCard'
import LoadFormDialog from '../dialog'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline, EyeOutline, PencilOutline } from 'mdi-material-ui'
import moment from 'moment'
import { loadService } from 'services/load.service'
import DeleteDialog from 'src/views/components/dialogs/DeleteDialog'
import { de } from 'date-fns/locale'
import { Stack } from '@mui/system'
import toast from 'react-hot-toast'
import Link from 'next/link'

const Img = styled('img')(({ theme }) => ({
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(15),
	[theme.breakpoints.down('lg')]: {
		height: 225,
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	[theme.breakpoints.down('md')]: {
		height: 200
	}
}))


const changeStatus = async (newValues, status) => {
	try {
		const values = {
			pickup_earliest_date: newValues.pickup_earliest_date,
			pickup_latest_date: newValues.pickup_latest_date,
			pickup_hours_start: newValues.pickup_hours_start,
			pickup_hours_end: newValues.pickup_hours_end,
			delivery_hours_start: newValues.delivery_hours_start,
			delivery_hours_end: newValues.delivery_hours_end,
			origin_city_id: newValues.origin_city_id,
			destination_city_id: newValues.destination_city_id,
			full_partial: newValues.full_partial,
			weight: newValues.weight,
			length: newValues.length,
			comments: newValues.comments,
			commodity: newValues.commodity,
			contact_phone:  newValues.contact_phone,
			contact_email: newValues.contact_email,
			rate: newValues.rate,
			categories: newValues.categories.map(x => x.id),
			is_enabled: status
		  }
		await loadService.update(newValues.id, values)
	} catch (er) {
		console.log(er);
	}
} 

const LoadsList = (props) => {

	const router = useRouter()

	const defaultColumns = [
		{
			flex: 0.2,
			minWidth: 90,
			field: 'is_enabled',
			headerName: 'Status',
			renderCell: ({ row }) => {
				
				let [ is_enabled, setIs_enabled ] = useState(row.is_enabled)
				const isFirstRun = useRef(true);
				useEffect(() => {
					
					if (isFirstRun.current) {
						isFirstRun.current = false;
						return;
					}
					changeStatus(row, is_enabled);
				  }, [is_enabled])
			  return (
				
					
						<Switch checked={is_enabled} size={'small'} onChange={(e) => 
							setIs_enabled(!is_enabled)
							// changeStatus(row.id, !row.is_enabled)
						}  />
					
				
			  )
			}
		},
		 {
		 	flex: 0.2,
		 	minWidth: 60,
		 	field: 'REF',
		 	headerName: 'ID',
		 	renderCell: ({ row }) => {
		 	  return (
		 		<Typography noWrap variant='body2'>
		 		  {row.id}
		 		</Typography>
		 	  )
		 	}
		 },
		{
			flex: 0.2,
			minWidth: 100,
			field: 'created_at',
			headerName: 'Created',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {moment(row.created_at).format('MM/DD/YY')}
				</Typography>
			  )
			}
		},
		{
			flex: 0.5,
			minWidth: 120,
			field: 'origin',
			headerName: 'Origin',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.origin.name}, {row.origin.state.abbreviation}
				</Typography>
			  )
			}
		},
		{
			flex: 0.5,
			minWidth: 120,
			field: 'destination',
			headerName: 'Destination',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.destination.name}, {row.destination.state.abbreviation}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 70,
			field: 'full_partial',
			headerName: 'F/P',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.full_partial.toUpperCase()}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 100,
			field: 'pickup_earliest_date',
			headerName: 'Pickup',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {moment(row.pickup_earliest_date).format('MM/DD/YY')}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 90,
			field: 'Weight',
			headerName: 'weight',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.weight} lb
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 90,
			field: 'length',
			headerName: 'Length',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.length} ft
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 70,
			field: 'rate',
			headerName: 'Rate',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.rate ? '$'+row.rate : '-'}
				</Typography>
			  )
			}
		},
		// {
		// 	flex: 0.5,
		// 	minWidth: 140,
		// 	field: 'contact_email',
		// 	headerName: 'Contact email',
		// 	renderCell: ({ row }) => {
		
		// 	  return (
		// 		<Typography noWrap variant='body2'>
		// 		  {row.contact_email}
		// 		</Typography>
		// 	  )
		// 	}
		// },
		// {
		//   flex: 0.2,
		//   minWidth: 140,
		//   field: 'contact_phone',
		//   headerName: 'Contact phone',
		//   renderCell: ({ row }) => {
		// 	return (
		// 	  <Typography noWrap variant='body2'>
		// 		{row.contact_phone}
		// 	  </Typography>
		// 	)
		//   }
		// }
	]

	const deleteLoad = async (id) => {

		try {
			await dispatch(setLoading(true))
			await loadService.delete(id)
			await dispatch(setLoading(false))
			toast.success('Load #'+id+' have been removed')
			reload()
		} catch (er){
			await dispatch(setLoading(false))
			if(er.errors && Array.isArray(er.errors)){
				er.errors.map(x => toast.error(x.message))
			}
		}
	}

	const [ scopedLoadToEdit, setScopedLoadToEdit ] = useState(null)

	const columns = [
		...defaultColumns,
		{
		  flex: 0.1,
		  minWidth: 130,
		  sortable: false,
		  field: 'actions',
		  headerName: 'Actions',
		  renderCell: ({ row }) => (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
			  
			  <Tooltip title='View Load'>
				<Box>
				  <Link href={`/loads/[id]`} as={`/loads/${row.id}`}>
					<IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
					  <EyeOutline />
					</IconButton>
				  </Link>
				</Box>
			  </Tooltip>
			  <Tooltip title='Edit Load'>
				<IconButton size='small' sx={{ mr: 0.5 }} onClick={() => {
					setScopedLoadToEdit(row)
					setIsDialogOpen(true)
				}}>
				  <PencilOutline />
				</IconButton>
			  </Tooltip> 
			  <Tooltip title='Delete Load'>
				<IconButton size='small' sx={{ mr: 0.5 }} onClick={() => setScopedDialogToDelete(row.id)}>
				  <DeleteOutline />
				</IconButton>
			  </Tooltip> 
			</Box>
		  )
		}
	]

	const store = useSelector(state => state.load)
	const [search, set_search] = useState(new URLSearchParams(window.location.search).get('search') || '')

	const { requiredFilter } = props

    const [sortOptions, setSortOptions] = useState([
		{
			label:'Date',
			sort_field:'create_at',
			sort_order:'desc',
			value:'created_at|desc',
			default: true,
		},{
			label:'Rating',
			sort_field:'rating',
			sort_order:'desc',
			value:'rating|desc'
		}
	])

	const getData = (url_params) => {
	
		dispatch(getLoads(`${requiredFilter || ''}${url_params ? url_params+'&' : ''}`))
	}

	const dispatch = useDispatch()

    useEffect(() => {
		getData(window.location.search ? window.location.search.replace('?', '') : null)
    }, [])

	const reload = () => {
		getData(window.location.search ? window.location.search.replace('?', '') : null)
	}

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			shallow && getData(url.split('?')[1] ? url.split('?')[1] : null)
		}

		router.events.on('routeChangeStart', handleRouteChange)

		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [])

	const [ isDialogOpen, setIsDialogOpen ] = useState(false)

	const [scopedDialogToDelete, setScopedDialogToDelete] = useState(null)


    return (
		<Box>
			<DeleteDialog
				title = {'Delete Load #'+scopedDialogToDelete}
				subtitle = {'If you delete this record you wont be able to get it back. Are you sure you want to delete the selected load?'}
				deleteRecord = { deleteLoad }
				recordId = { scopedDialogToDelete }
				open = {Boolean(scopedDialogToDelete)}
				setOpen = {setScopedDialogToDelete}
			/>
			<LoadFormDialog 
				open={isDialogOpen}
				setOpen={setIsDialogOpen}
				reload={reload}
				scopedLoadToEdit={scopedLoadToEdit}
				setScopedLoadToEdit={setScopedLoadToEdit}
			/>
			{/* {
				store.loading ? (
					<Box style={{width:'100%', textAlign:'center'}}>
						<CircularProgress disableShrink sx={{ mt: 6 }} />
					</Box>
				) : (!store.data.length > 0) ? (
					<Box style={{display:'flex', alignItems:'center', marginTop:'2rem', flexDirection:'column'}}>
						<Typography variant='h5' style={{fontWeight:'700'}}>You haven't added any loads</Typography>
						<Img alt='error-illustration' src='/images/pages/kb-api.png' />
						<Box>
							<Button onClick={()=>setIsDialogOpen(true)} variant='contained'>Add your first load</Button>
						</Box>
					</Box>
				) : ( */}
					<Box>
						<Grid item xs={12}>
      					  <Card>
      					    <Box sx={{ p: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      					        {/* <TextField
      					          size='small'
      					          value={search}
      					          sx={{ mr: 6, mb: 2 }}
      					          placeholder='Search Business'
      					          onChange={(e)=>set_search(e.target.value)}
      					        /> */}
								<Typography variant='h6'>Loads</Typography>
								<Button onClick={()=>setIsDialogOpen(true)} variant='contained'>Add Load</Button>
      					    </Box> 
      					    <DataGrid
      					      autoHeight
      					      disableSelectionOnClick
      					      disableColumnMenu
							components={{
								NoRowsOverlay: () => (<Stack height="100%" alignItems="center" justifyContent="center">
									<h2>You haven't added any load</h2>
							  	</Stack>)
							}}
      					      rows={store.data}
      					      rowCount={store.total}
      					      loading={store.loading}
      					      page={store.current_page - 1}
      					      rowsPerPageOptions={[2, 12, 24, 48]}
      					      pagination
      					      pageSize={store.page_size}
      					      initialState={
      					        (new URLSearchParams(window.location.search).get('sort_field') && new URLSearchParams(window.location.search).get('sort_order')) ? (
      					          {
      					            sorting: {
      					              sortModel: [{ field: new URLSearchParams(window.location.search).get('sort_field'), sort: new URLSearchParams(window.location.search).get('sort_order') }],
      					            }
      					          }
      					        ) : {
      					        }
      					      }
      					      sortingMode={'server'}
      					      paginationMode="server"
      					      onSortModelChange={(e)=>{
      					        if(e['0']){
      					          urlManager({
									params:[
										{
										  key: 'sort_field',
										  value: e['0']['field'],
										  type: 'replace'
										},{
										  key: 'sort_order',
										  value: e['0']['sort'],
										  type: 'replace'
										}
									],
									router: router
								  })
      					        } else {
      					          urlManager({
									params:[
										{
										  key: 'sort_field',
										  value: '',
										  type: 'remove'
										},{
										  key: 'sort_order',
										  value: '',
										  type: 'remove'
										}
									],
									router: router
								  })
      					        }
      					      }}
      					      onPageChange={(newPage) => urlManager({
								params: [
									{
									  key: 'page_number',
									  value: newPage + 1,
									  type: 'replace'
									}
								],
								router: router
							  })}
      					      onPageSizeChange={
      					        (newPageSize) => urlManager({
									params: [
										{
										  key: 'page_size',
										  value: newPageSize,
										  type: 'replace'
										}
									],
									router: router
								})
      					      }
      					      columns={columns}
      					      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      					    /> 
      					  </Card>
      					</Grid>
					</Box>
				{/* )
			} */}
		</Box>
    )
}


export default LoadsList