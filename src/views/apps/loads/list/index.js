// ** React Imports
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { Button, Card, CircularProgress, IconButton, MenuItem, Pagination, Select, TextField, Tooltip, Typography } from '@mui/material'
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

const LoadsList = (props) => {

	const defaultColumns = [
		{
			flex: 0.2,
			minWidth: 150,
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
			flex: 0.2,
			minWidth: 150,
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
			minWidth: 80,
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
			minWidth: 120,
			field: 'pickup_earliest_date',
			headerName: 'Pickup Date',
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
			minWidth: 120,
			field: 'Weight',
			headerName: 'weight',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.weight} {row.weight_unit_type}
				</Typography>
			  )
			}
		},
		{
			flex: 0.2,
			minWidth: 120,
			field: 'length',
			headerName: 'Length',
			renderCell: ({ row }) => {
			  return (
				<Typography noWrap variant='body2'>
				  {row.length} {row.length_unit_type}
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
		{
			flex: 0.5,
			minWidth: 150,
			field: 'contact_email',
			headerName: 'Contact email',
			renderCell: ({ row }) => {
		
			  return (
				<Typography noWrap variant='body2'>
				  {row.contact_email}
				</Typography>
			  )
			}
		},
		{
		  flex: 0.2,
		  minWidth: 140,
		  field: 'contact_phone',
		  headerName: 'Contact phone',
		  renderCell: ({ row }) => {
			return (
			  <Typography noWrap variant='body2'>
				{row.contact_phone}
			  </Typography>
			)
		  }
		}
	]

	const deleteLoad = async (id) => {

		try {
			await dispatch(setLoading(true))
			await loadService.delete(id)
			await dispatch(setLoading(false))
			toast.success('Load #'+id+' have been removed')
			reload()
		} catch (er){
			console.log(er);
		}
	}

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
				<IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}>
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

	const router = useRouter()

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
      					          urlManager([
      					            {
      					              key: 'sort_field',
      					              value: e['0']['field'],
      					              type: 'replace'
      					            },{
      					              key: 'sort_order',
      					              value: e['0']['sort'],
      					              type: 'replace'
      					            }
      					          ])
      					        } else {
      					          urlManager([
      					            {
      					              key: 'sort_field',
      					              value: '',
      					              type: 'remove'
      					            },{
      					              key: 'sort_order',
      					              value: '',
      					              type: 'remove'
      					            }
      					          ])
      					        }
      					      }}
      					      onPageChange={(newPage) => urlManager([
      					        {
      					          key: 'page_number',
      					          value: newPage + 1,
      					          type: 'replace'
      					        }
      					      ])}
      					      onPageSizeChange={
      					        (newPageSize) => urlManager([
      					          {
      					            key: 'page_size',
      					            value: newPageSize,
      					            type: 'replace'
      					          }
      					        ])
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