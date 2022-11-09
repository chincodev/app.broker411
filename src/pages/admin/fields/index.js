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
import { fetchData } from 'src/store/apps/field'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { Button, TextField, Tooltip } from '@mui/material'
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { isEmpty } from 'lodash'
import SidebarAddCategory from 'src/views/apps/fields/FormDrawer'
import { PencilOutline } from 'mdi-material-ui'



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
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'context',
    headerName: 'Context',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.context}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.type}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.description}
        </Typography>
      )
    }
  },
]



const FieldList = () => {
  // ** State
  const [search, set_search] = useState(new URLSearchParams(window.location.search).get('search') || '')
  const [ debounced_search ] = useDebounce(search, 1000);

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.fields)
  useEffect(() => {
    if(!store.total){
      dispatch(fetchData(window.location.search))
    }
  }, [])
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
          
          <Tooltip title='Edit Record'>
            <Box>
              <a href={`#`} onClick={()=>{
                setIsEdit(true)
                setDefaultValues(row)
                toggleDrawer()
              }} passHref>
                <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
                  <PencilOutline />
                </IconButton>
              </a>
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

      console.log(currentUrlParams.toString())
    
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
  

  const [ openDrawer, setOpenDrawer ] = useState(false)

  const defaultValuesInitialValue = {
    name: '',
    type: '',
    context: '',
    description: '',
    id: ''
  }
  const [ defaultValues, setDefaultValues ] = useState(defaultValuesInitialValue)

  const [ isEdit, setIsEdit ] = useState(false)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  } 

  return (
    <Grid container spacing={6}>
      <SidebarAddCategory 
        defaultValues={defaultValues}
        isEdit={isEdit}
        open={openDrawer}
        toggle={toggleDrawer}
      />
      <Grid item xs={12}>
        <Card>
          <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent:'space-between', width:'100%' }}>
              <TextField
                size='small'
                value={search}
                sx={{ mr: 6, mb: 2 }}
                placeholder='Search by Username'
                onChange={(e)=>set_search(e.target.value)}
              />
              <Button onClick={()=>{
                setIsEdit(false)
                setDefaultValues(defaultValuesInitialValue)
                toggleDrawer()
                }} sx={{ mr: 6, mb: 2 }} type='submit' color='secondary' variant='contained' size='medium'>
                New Field
              </Button>
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
FieldList.authGuard = true
export default FieldList
