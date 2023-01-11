import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from 'src/@core/components/mui/chip'
import { fetchData, deleteUser } from 'src/store/apps/user'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { FormControl, InputLabel, MenuItem, TextField, Tooltip, Box, Select } from '@mui/material'
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import getCurrentFilters from '../../../../utils/getCurrentFilters'
import { isEmpty } from 'lodash'
import GetFiltersHook from '../../../../utils/GetFiltersHook'


const businessMemberTypes = {
  none: 'secondary',
  pending: 'warning',
  confirmed: 'primary',
}

const userTypes = {
  administrator: 'primary',
  owner: 'success',
  representative: 'secondary',
}


function CustomNoRowsOverlay() {
  return (
    <Box sx={{ mb: 10, mt: 10 }}>
      <h3 style={{textAlign: 'center'}}>No Data Found.</h3>
    </Box>
  );
}

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'username',
    headerName: 'Username',
    renderCell: ({ row }) => {
      const { id, fullName, username } = row

      return (
        <Typography noWrap variant='body2'>
          @{row.username}
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
    flex: 0.2,
    minWidth: 250,
    field: 'business.legal_name',
    headerName: 'Business',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.business ? row.business.legal_name : row.request_business ? row.request_business.legal_name : '-'}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 100,
    field: 'business.type',
    headerName: 'Business Type',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          <strong>{row.business ? row.business.type.toUpperCase() : row.request_business ? row.request_business.type.toUpperCase() : '-'}</strong>
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'business',
    headerName: 'Membership',
    renderCell: ({ row }) => {
      return (
          <CustomChip
            skin='light'
            size='small'
            label={row.request_business_id ? 'Pending' : row.business_id && !isEmpty(row.business) ? 'Confirmed' : 'None'}
            color={businessMemberTypes[row.request_business_id ? 'pending' : row.business_id && !isEmpty(row.business) ? 'confirmed' : 'none']}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
     
      )
    }
  },{
    flex: 0.2,
    minWidth: 120,
    field: 'role',
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
          <CustomChip
            skin='light'
            size='small'
            label={row.role.name}
            color={userTypes[row.role.name.toLowerCase()]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
     
      )
    }
  },
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
        
        <Tooltip title='View User'>
          <Box>
            <Link href={`/admin/users/${row.id}`} passHref>
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

const UserList = () => {

  const [ allFilters ] = GetFiltersHook()

  // ** State
  const [search, set_search] = useState(new URLSearchParams(window.location.search).get('search') || '')
  const [ debounced_search ] = useDebounce(search, 1000);

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
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
      <Grid item xs={12}>
        {console.log(allFilters)}
        <Card>
          <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                size='small'
                value={search}
                sx={{ mr: 6, mb: 2 }}
                placeholder='Search by Username'
                onChange={(e)=>set_search(e.target.value)}
              />
            </Box>
            
            <Box sx={{display:'flex'}}>
              <FormControl sx={{mr:1}} size='small'>
                <InputLabel id='invoice-status-select'>Membership</InputLabel>
                <Select
                  sx={{ pr: 4 }}
                  value={allFilters.find(x => x.filter_type==='ne' && x.filter_field==='request_business_id')?.filter_value || ''}
                  label='Invoice Status'
                  onChange={(e)=>{
                      if(e.target.value === 'null'){
                        urlManager([
                          {
                            key: 'filter_field[]',
                            value: 'request_business_id',
                            type:'replace'
                          },
                          {
                            key: 'filter_type[]',
                            value: 'ne',
                            type:'replace'
                          },
                          {
                            key: 'filter_value[]',
                            value: 'null',
                            type:'replace'
                          }
                        ])
                      } else {
                        urlManager([
                          {
                            key: 'filter_field[]',
                            value: 'request_business_id',
                            type:'remove'
                          },
                          {
                            key: 'filter_type[]',
                            value: 'ne',
                            type:'remove'
                          },
                          {
                            key: 'filter_value[]',
                            value: 'null',
                            type:'remove'
                          }
                        ])
                      }
                    }
                  }
                  labelId='invoice-status-select'
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='null'>Pending</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControl size='small'>
                <InputLabel id='invoice-status-select'>Role</InputLabel>
                <Select
                  sx={{ pr: 4 }}
                  value={''}
                  label='Invoice Status'
                  onChange={()=>getCurrentFilters()}
                  labelId='invoice-status-select'
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='1'>Admin</MenuItem>
                  <MenuItem value='4'>Guest</MenuItem>
                  <MenuItem value='2'>Owner</MenuItem>
                  <MenuItem value='3'>Representative</MenuItem>
                </Select>
              </FormControl> */}
            </Box>
          </Box>
          <DataGrid
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            rows={store.data.length > 0 ? store.data : []}
            rowCount={store.total || 0}
            loading={store.loading}
            page={store.current_page - 1 > 0 ? store.current_page - 1 : 0 }
            rowsPerPageOptions={[2, 12, 24, 48]}
            pagination
            pageSize={store.data.length != 0 ? store.page_size : 1}
            initialState={
              (new URLSearchParams(window.location.search).get('sort_field') && new URLSearchParams(window.location.search).get('sort_field')) ? (
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
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
          /> 
        </Card>
      </Grid>
    </Grid>
  )
}
UserList.authGuard = true
export default UserList
