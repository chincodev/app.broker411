import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from 'src/@core/components/mui/chip'
import { fetchData, deleteBusiness } from 'src/store/apps/business'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { TextField, Tooltip } from '@mui/material'
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router'



const userStatusObj = {
  carrier: 'success',
  broker: 'primary'
}



const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'legal_name',
    headerName: 'Legal Name',
    renderCell: ({ row }) => {
      const { id, fullName, username } = row

      return (
        <Typography noWrap variant='body2'>
          {row.legal_name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'type',
    minWidth: 150,
    headerName: 'Type',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.type}
          color={userStatusObj[row.type]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    }
  }
]

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
        
        <Tooltip title='View Business'>
          <Box>
            <Link href={`/admin/businesses/${row.id}`} passHref>
              <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                <EyeOutline />
              </IconButton>
            </Link>
          </Box>
        </Tooltip>
        {/* <Tooltip title='Delete Business'>
          <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}>
            <DeleteOutline />
          </IconButton>
        </Tooltip> */}
      </Box>
    )
  }
]

const BusinessList = () => {
  // ** State
  const [search, set_search] = useState(new URLSearchParams(window.location.search).get('search') || '')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [ debounced_search ] = useDebounce(search, 1000);

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.business)
  useEffect(() => {
    if(!store.total){
      dispatch(fetchData(window.location.search.replace('?', '')))
    }
  }, [])

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    urlManager([
      {
        key: 'search',
        value: debounced_search,
        type: debounced_search.length === 0 ? 'remove' : 'replace'
      },
      {
        key: 'page_number',
        value: '',
        type: 'remove'
      }
    ])
  }, [debounced_search])
  

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const router = useRouter()

  const urlManager = (values) => {

    let currentUrlParams = new URLSearchParams(window.location.search)
    

      values && values.length > 0 && values.map(x => {
        if(x.type === 'replace'){
          currentUrlParams.set(x.key, x.value)
        }
        if(x.type === 'remove'){
          currentUrlParams.delete(x.key)
        }
      })
    
    router.push('?'+currentUrlParams.toString(), undefined, { shallow: true })
  }

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      shallow && dispatch(
        fetchData(url.split('?')[1])
      )
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Type</MenuItem>
                    <MenuItem value='admin'>Broker</MenuItem>
                    <MenuItem value='author'>Carrier</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Verification</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Verification</MenuItem>
                    <MenuItem value='basic'>Verified</MenuItem>
                    <MenuItem value='company'>Unverified</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='basic'>Enabled</MenuItem>
                    <MenuItem value='company'>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Visibility</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Visibility</MenuItem>
                    <MenuItem value='pending'>Published</MenuItem>
                    <MenuItem value='active'>Unpublished</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                size='small'
                value={search}
                sx={{ mr: 6, mb: 2 }}
                placeholder='Search Business'
                onChange={(e)=>set_search(e.target.value)}
              />
            </Box>
          </Box>
          <DataGrid
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
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

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}
BusinessList.authGuard = true
export default BusinessList
